import CheckoutForm from "@/components/Checkout/CheckoutForm";
import SectionTitle from "@/components/shared/SectionTitle";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISH_KEY);

const Checkout = () => {
  return (
    <>
      <title>Bistro Boss | Payment</title>
      <section>
        <div className="db__container">
          <SectionTitle subHeading={"Proceed To"} heading={"Payment"} />
          <div className="bg-white p-12">
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </section>
    </>
  );
};

export default Checkout;
