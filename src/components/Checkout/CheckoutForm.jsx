import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useCart from "@/hooks/useCart";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

function CheckoutForm() {
  const [error, setError] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transitionId, setTransitionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [cart] = useCart();
  const { user } = useAuth();

  const price = cart?.reduce(
    (prevVal, currVal) => prevVal + currVal.product.price,
    0
  );

  useEffect(() => {
    axiosSecure
      .post("/payment/create-payment-intent", { price })
      .then((res) => {
        setClientSecret(res.data.data.clientSecret);
      });
  }, [axiosSecure, price]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    console.log("object");

    if (error) {
      setError(error.message);
    } else {
      console.log(paymentMethod);
      setError(null);
    }

    // Confirm payment
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      console.log("ConfirmError");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransitionId(paymentIntent.id);
      }
    }

    setProcessing(false);
  };

  return (
    <form className="space-y-16" onSubmit={handleSubmit}>
      <CardElement
        className=""
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="max-w-md mx-auto">
        <button
          className="p-4 w-full inline-block rounded-xl bg-[#570DF8] border-[#570DF8] text-xl text-white btn-block disabled:bg-gray-500"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay
        </button>
        <div className="mt-6">
          {error && (
            <p className="text-red-500 text-lg text-center font-inter">
              {error}
            </p>
          )}
          {transitionId && (
            <p className="text-green-500 text-lg text-center font-inter">
              Transition ID: {transitionId}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}

export default CheckoutForm;
