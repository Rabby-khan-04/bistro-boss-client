import SectionTitle from "@/components/shared/SectionTitle";
import Spinner from "@/components/shared/Spinner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Controller, useForm } from "react-hook-form";
import { MdOutlineRestaurant } from "react-icons/md";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateProduct() {
  const { register, handleSubmit, control } = useForm();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data: menuItem, isLoading: menuItemIsLoading } = useQuery({
    queryKey: ["menuItem", { id, axiosSecure }],
    queryFn: async () => {
      const res = await axiosSecure.get(`/menu/menu-item/${id}`);
      return res.data.data;
    },
  });
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosging_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    const name = data.name;
    const price = parseFloat(data.price);
    const recipe = data.recipe;
    const image = data.image[0];
    const category = data.category;

    // const form = new FormData();

    const res = await axios.post(
      image_hosging_api,
      { image },
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (res.data.success) {
      const menuData = {
        name,
        price,
        recipe,
        category,
        image: res.data.data.display_url,
      };

      const menuRes = await axiosSecure.patch(
        `/menu/menu-item/${menuItem._id}`,
        menuData
      );

      if (menuRes.data.data.modifiedCount) {
        Swal.fire({
          position: "center-center",
          icon: "success",
          title: "Menu Item Updated Successfully ",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  if (menuItemIsLoading) return <Spinner />;

  return (
    <>
      <title>Bistro Boss | Add Items</title>
      <section>
        <div className="db__container">
          <SectionTitle subHeading={"What's new?"} heading={"ADD AN ITEM"} />
          <div className="bg-[#F3F3F3] p-12">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4 w-full max-w-full">
                <label className="text-xl font-semibold text-neutral inline-block">
                  <span className="text-xl text-[#444444] font-inter">
                    Recipe Name*
                  </span>
                </label>
                <Input
                  defaultValue={menuItem.name}
                  type="text"
                  placeholder="Recipe Name"
                  {...register("name")}
                  className="p-8 bg-white"
                />
              </div>

              <div className="grid md:grid-cols-2 md:gap-6">
                {/* Category Selection with Controller */}
                <div className="space-y-4 w-full max-w-full">
                  <label className="text-xl font-semibold text-neutral inline-block">
                    <span className="text-xl text-[#444444] font-inter">
                      Category*
                    </span>
                  </label>
                  <Controller
                    name="category"
                    control={control}
                    rules={{ required: "Category is required" }}
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={menuItem.category}
                      >
                        <SelectTrigger className="w-full p-8 bg-white">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
                            <SelectItem value="salad">Salad</SelectItem>
                            <SelectItem value="pizza">Pizza</SelectItem>
                            <SelectItem value="soup">Soup</SelectItem>
                            <SelectItem value="dessert">Dessert</SelectItem>
                            <SelectItem value="drinks">Drinks</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    )}
                  />
                </div>

                {/* Price Input */}
                <div className="space-y-4 w-full max-w-full">
                  <label className="text-xl font-semibold text-neutral inline-block">
                    <span className="text-xl text-[#444444] font-inter">
                      Price*
                    </span>
                  </label>
                  <Input
                    type="text"
                    defaultValue={menuItem.price}
                    placeholder="Price"
                    {...register("price")}
                    className="p-8 bg-white"
                  />
                </div>
              </div>

              {/* Recipe Details */}
              <div className="space-y-4">
                <label className="text-xl font-semibold text-neutral inline-block">
                  <span className="text-xl text-[#444444] font-inter">
                    Recipe Details
                  </span>
                </label>
                <Textarea
                  defaultValue={menuItem.recipe}
                  className="bg-white h-24"
                  placeholder="Recipe Details"
                  {...register("recipe")}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-4">
                <Input
                  type="file"
                  {...register("image", { required: "Image is required" })}
                  className="shadow-none border-none inline-block p-8 bg-white w-auto"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="py-4 px-8 flex items-center gap-2 bg-gradient-to-r from-[#835D23] to-[#B58130] border-golden text-xl text-white rounded-none cursor-pointer"
              >
                <span>Update Item</span>
                <MdOutlineRestaurant className="text-3xl" />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default UpdateProduct;
