import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hostin_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hostin_key}`;

const AddBanner = () => {

    const axiosSecure = useAxiosSecure();
    const { register, handleSubmit } = useForm();


    const onSubmit = async (data) => {
        console.log(data)
        const imageFile = { image: data.image[0] };
        const res = await axiosSecure.post(image_hosting_api, imageFile, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const title = data.title;
            const text = data.text;
            const image = res.data.data.display_url;
            const discountRate = parseInt(data.discountRate);
            const couponCode = data.couponCode;
            const isActive = false;
            const bannerInfo = { title, text, image, discountRate, couponCode, isActive };
            
            axiosSecure.post('/banner', bannerInfo)
            .then(res => {
                console.log(res.data)
                Swal.fire({
                    position: "center-center",
                    icon: "success",
                    title: "Your banner has been added",
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
        <div className="py-20">
            <div className="mx-20 bg-[#f6f6f6] p-10">
                <h3 className="text-4xl uppercase text-center font-bold mb-10">Add a banner</h3>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-2 gap-10 mb-3">
                            <div>
                                <label>Title</label>
                                <input {...register("title")} className="w-full p-3 border" type="text" placeholder="Title" />
                            </div>
                            <div>
                                <label>Image</label>
                                <input {...register("image")} type="file" className="file-input file-input-bordered w-full" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-10 mb-3">
                            <div>
                                <label>Discount rate</label>
                                <input {...register("discountRate")} className="w-full p-3 border" type="text" placeholder="Discount rate" />
                            </div>
                            <div>
                                <label>Coupon code</label>
                                <input {...register("couponCode")} className="w-full p-3 border" type="text" placeholder="COUPON CODE" />
                            </div>
                        </div>
                        <div>
                            <label>Banner text</label>
                            <textarea {...register("text")} className="w-full p-3 border" id="" cols="5" rows="3"></textarea>
                        </div>
                        <div>
                            <input className="w-full btn bg-sec text-white hover:bg-prime uppercase font-bold mt-10" type="submit" value="Add banner" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddBanner;