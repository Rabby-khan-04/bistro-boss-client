import SectionTitle from "@/components/shared/SectionTitle";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useMenu from "@/hooks/useMenu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import Swal from "sweetalert2";

const ManageProduct = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalMenu, setTotalMenu] = useState(0);
  const axiosSecure = useAxiosSecure();
  const limit = 10;
  const numberOfPages = Math.ceil(totalMenu / limit);
  const pages = [...Array(numberOfPages).keys()];
  const [menu] = useMenu("all", currentPage, limit);
  const queryClient = useQueryClient();

  const { mutateAsync: deleteMenuItem } = useMutation({
    mutationKey: ["delete-menu"],
    mutationFn: async (id) => {
      const res = await axiosSecure.delete(`/menu/menu/${id}`);
      return res;
    },
    onSuccess: (res) => {
      if (res.data.data.deletedCount) {
        queryClient.invalidateQueries(["menu"]);
      }
    },
  });

  useEffect(() => {
    setCurrentPage(0);
    axiosSecure
      .get(`/menu/count/all`)
      .then((res) => setTotalMenu(res.data.data));
  }, [axiosSecure]);

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (currentPage <= pages.length) {
      setCurrentPage((prev) => prev + 1);
    } else {
      setCurrentPage(pages.length - 1);
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMenuItem(id);
      }
    });
  };

  return (
    <>
      <title>Bistro Boss | Manage Items</title>
      <section>
        <div className="db__container">
          <SectionTitle
            subHeading={"Hurry Up!"}
            heading={"MANAGE ALL PRODUCTS"}
          />
          <div className="bg-[#F3F3F3] p-12">
            <h2 className="text-3xl font-cinzel font-bold text-neutral mb-12">
              {/* Total Users: {menus.length} */}
            </h2>
            <div className="overflow-x-auto w-full">
              <table className="table w-full font-inter border-separate border-spacing-y-4">
                {/* head */}
                <thead>
                  <tr className="uppercase">
                    <th className="bg-gold text-white">#</th>
                    <th className="bg-gold text-white">Item Image</th>
                    <th className="bg-gold text-white">Itme Name</th>
                    <th className="bg-gold text-white">Price</th>
                    <th className="bg-gold text-white">Action</th>
                    <th className="bg-gold text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {menu?.map((menuItem, index) => (
                    <tr key={menuItem._id}>
                      <td>{index + 1}</td>
                      <td>
                        <img
                          className="h-20 w-20 object-cover object-center"
                          src={menuItem.image}
                          alt=""
                        />
                      </td>
                      <td>
                        <h2>{menuItem.name}</h2>
                      </td>
                      <td>
                        <h2>${menuItem.price}</h2>
                      </td>
                      <td>
                        <button className="p-4 inline-block rounded-xl cursor-pointer bg-golden border-golden">
                          <FaRegEdit className="text-2xl text-white" />
                        </button>
                      </td>
                      <td>
                        <button
                          className="p-4 inline-block rounded-xl cursor-pointer bg-error border-error"
                          onClick={() => handleDelete(menuItem._id)}
                        >
                          <RiDeleteBin5Line className="text-2xl text-white" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mt-12">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    disabled={currentPage === 0}
                    onClick={handlePrev}
                    className="cursor-pointer"
                  />
                </PaginationItem>
                {pages.map((page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className="cursor-pointer"
                  >
                    <PaginationLink isActive={currentPage === page}>
                      {page + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem disabled={currentPage === pages.length - 1}>
                  <PaginationNext
                    disabled={currentPage === pages.length - 1}
                    onClick={handleNext}
                    className="cursor-pointer"
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </section>
    </>
  );
};

export default ManageProduct;
