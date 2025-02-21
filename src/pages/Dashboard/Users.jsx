import SectionTitle from "@/components/shared/SectionTitle";
import Spinner from "@/components/shared/Spinner";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { HiUserGroup } from "react-icons/hi2";
import { RiAdminFill, RiDeleteBin5Line } from "react-icons/ri";

const Users = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading: userIsLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users/user");

      return res.data.data;
    },
  });

  if (userIsLoading) return <Spinner />;

  return (
    <>
      <title>Bistro Boss | All Users</title>
      <div>
        <div className="db__container">
          <SectionTitle
            subHeading={"How Many??"}
            heading={"MANAGE ALL USERS"}
          />
          <div className="bg-white p-12">
            <h2 className="text-3xl font-cinzel font-bold text-neutral mb-12">
              Total Users: {users.length}
            </h2>

            <div className="overflow-x-auto w-full">
              <table className="table w-full font-inter border-separate border-spacing-y-4">
                {/* head */}
                <thead>
                  <tr className="uppercase">
                    <th className="bg-gold text-white"></th>
                    <th className="bg-gold text-white">Name</th>
                    <th className="bg-gold text-white">Email</th>
                    <th className="bg-gold text-white">Role</th>
                    <th className="bg-gold text-white">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user._id} className="text-center">
                      <td>{index + 1}</td>
                      <td>
                        <h2>{user.name}</h2>
                      </td>
                      <td>
                        <h2>{user.email}</h2>
                      </td>
                      <td>
                        <button
                          className="p-4 inline-block rounded-xl cursor-pointer bg-gold border-gold"
                          // onClick={() => handleMakeAdmin(user._id)}
                        >
                          {user.role === "admin" ? (
                            <RiAdminFill
                              title="Admin"
                              className="text-2xl text-white"
                            />
                          ) : (
                            <HiUserGroup
                              title="User"
                              className="text-2xl text-white"
                            />
                          )}
                        </button>
                      </td>
                      <td>
                        <button
                          className="p-4 inline-block rounded-xl cursor-pointer bg-error border-error"
                          // onClick={() => handleDelete(user._id)}
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
        </div>
      </div>
    </>
  );
};

export default Users;
