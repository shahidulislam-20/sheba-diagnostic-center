

const Contact = () => {
    return (
        <div className="max-w-7xl mx-auto py-20">
            <div>
                <h3 className="bg-prime text-white font-bold uppercase text-4xl py-5 text-center rounded-lg">Contact</h3>
                <div className="max-w-2xl mx-auto mt-8 p-4 bg-[#f6f6f6] my-10 px-10 py-20 shadow-2xl">
                    <h1 className="text-3xl font-bold mb-6 text-center">Message</h1>
                    <form>
                        <div>
                            <label>Your name*</label>
                            <input className="p-3 border w-full" type="text" name="name" placeholder="Your name" />
                        </div>
                        <div className="my-5">
                            <label>Your email*</label>
                            <input className="p-3 border w-full" type="email" name="email" placeholder="Your email" />
                        </div>
                        <div>
                            <label>Your message*</label>
                            <textarea className="p-3 border w-full" name="message" cols="5" rows="5" placeholder="Your message"></textarea>
                        </div>
                        <button className="btn w-full bg-prime">Send</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;