import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hostin_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hostin_key}`;

const AddTest = () => {

    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit } = useForm()

    const onSubmit = async (data) => {

        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {

            const title = data.title;
            const image = res.data.data.display_url;
            const price = data.price;
            const slots = data.slots;
            const duration = data.duration;
            const preparation = data.preparation;
            const shortDescription = data.shortDescription;
            const times = [data.time1, data.time2, data.time3];
            const availableDates = [data.date1, data.date2, data.date3];
            const details = {duration, price, preparation};
            const testInfo = { title, image, details, slots, shortDescription, times, availableDates }

            axiosPublic.post('/tests', testInfo)
                .then(result => {
                    console.log(result)
                    Swal.fire({
                        position: "center-center",
                        icon: "success",
                        title: "Your test has been added",
                        showConfirmButton: false,
                        timer: 1500
                      });
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    return (
        <div className="pb-28">
            <h3 className="text-4xl font-bold text-center uppercase my-10">Add a test</h3>
            <div className="mx-28 p-10 bg-[#f6f6f6]">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-10 mb-2">
                        <div>
                            <label>Title</label>
                            <input {...register("title")} className="w-full p-3 border border-black rounded-lg" type="text" placeholder="Test title" />
                        </div>
                        <div>
                            <label>Image</label>
                            <input {...register("image")} type="file" className="file-input file-input-bordered w-full" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-10 mb-2">
                        <div>
                            <label>Duration</label>
                            <input {...register("duration")} className="w-full p-3 border border-black rounded-lg" type="text" placeholder="Duration hours" />
                        </div>
                        <div>
                            <label>Price</label>
                            <input {...register("price")} className="w-full p-3 border border-black rounded-lg" type="text" placeholder="Price" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-10 mb-2">
                        <div>
                            <label>Preparation</label>
                            <input {...register("preparation")} className="w-full p-3 border border-black rounded-lg" type="text" placeholder="Preparation" />
                        </div>
                        <div>
                            <label>Slots</label>
                            <input {...register("slots")} className="w-full p-3 border border-black rounded-lg" type="text" placeholder="Slots" />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-10">
                        <div>
                            <label>Date 01</label>
                            <input {...register("date1")} className="w-full p-3 border border-black rounded-lg mb-2" type="text" placeholder="YYYY-MM-DD" />
                            <label>Date 02</label>
                            <input {...register("date2")} className="w-full p-3 border border-black rounded-lg mb-2" type="text" placeholder="YYYY-MM-DD" />
                            <label>Date 03</label>
                            <input {...register("date3")} className="w-full p-3 border border-black rounded-lg mb-2" type="text" placeholder="YYYY-MM-DD" />
                        </div>
                        <div>
                            <label>Time 01</label>
                            <input {...register("time1")} className="w-full p-3 border border-black rounded-lg mb-2" type="text" placeholder="00:00 AM - 00:00 PM" />
                            <label>Time 02</label>
                            <input {...register("time2")} className="w-full p-3 border border-black rounded-lg mb-2" type="text" placeholder="00:00 AM - 00:00 PM" />
                            <label>Time 03</label>
                            <input {...register("time3")} className="w-full p-3 border border-black rounded-lg mb-2" type="text" placeholder="00:00 AM - 00:00 PM" />
                        </div>
                    </div>
                    <div>
                        <label>Short Description</label>
                        <textarea {...register("shortDescription")} className="w-full p-3 border border-black rounded-lg" placeholder="Short Description" cols="5" rows="3"></textarea>
                    </div>
                    <div>
                        <input className="uppercase text-xl font-bold btn w-full mt-5 bg-sec text-white hover:bg-prime" type="submit" value="Add Test" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTest;