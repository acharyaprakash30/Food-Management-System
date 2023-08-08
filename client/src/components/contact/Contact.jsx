import React, { useEffect, useRef } from "react";
import FormImage from "../../assests/FormImage.png";
import "./Contact.css";
import { useState } from "react";
import { motion } from "framer-motion";
import { btnClick } from "../../animations";
import Social from "./Social";
import emailjs from 'emailjs-com'
import { useSelector } from "react-redux";




function Contact() {
    const currUser = useSelector(state => state.currUser)

    //incase of state it doent get re declared currUser.userData?.userName || '' this logic wont work
    const [formValues, setFormValues] = useState({ name: '', email: '', title: '', message: '' })
    const form = useRef()
    const [error, setError] = useState(false)
    const [sending, setSending] = useState(false);

    const changeHandler = (e) => setFormValues({ ...formValues, [e.target.name]: e.target.value })


    useEffect(() => {
        if (currUser.userData) {
            setFormValues(prevFormValues => ({
                ...prevFormValues,
                name: currUser.userData.userName || ''
            }));
        }
    }, [currUser.userData]);


    function sendEmail(e) {
        e.preventDefault();
        // console.log(formValues);
        //service id template id public key
        setSending(true)
        emailjs.sendForm('React-Reyzon', 'foodzoone', form.current, 'r_hRLdvYYGgJ3FBa-')
            .then((result) => {
                // console.log(result.text);
                setSending(false)
                setFormValues({ name: currUser.userData?.userName || '', title: '', email: '', message: '' })
            }, (error) => {
                // console.log(error.text);
            });


    }

    return (
        <div className="contact global flex flex-col items-center justify-center  relative pt-28 pb-8 bg-gradient-to-b from-gray-100 to-zinc-300 " >
            <Social />
            <aside className="contact-stripe  right-0 h-[630px] md:h-[710px]  absolute  z-50"></aside>
            <div className="bg-stone-300 w-[70vw] left-[196px]   h-[630px] md:h-[664px]  absolute  z-0"></div>
            <div className="absolute bottom-0  foodzone font-bold  font-sans text-xs  md:text-base">FOODZONE<span className="md:text-lg ">©</span>2023</div>
            <div className="bg-white z-1 rounded  mt-3  pb-6 flex flex-col items-center w-[90%] md:w-[70%] z-20">
                <div className=" flex flex-col justify-center items-center gap-2 mt-2">
                    <h2 className="text-3xl md:text-[36px] font-extrabold tracking-widest">Stay Connected</h2>
                    <p className="text-md text-blue-800">Have a feedback about our service? Write down.</p>
                </div>
                <div className="form-body flex items-center justify-between  w-full">
                    <div className="form-leftouts flex flex-col justify-center" data-aos="zoom-in-right" data-aos-delay={300} >
                        <img src={FormImage} loading="lazy" />
                    </div>
                    <div className="form-container flex flex-col justify-start gap-10 items-center">
                        <form onSubmit={sendEmail} className="contact-form flex flex-col justify-start gap-10 h-full w-full " ref={form} >
                            <input data-aos="fade-left" data-aos-delay={100} placeholder="Your Name" type="text" required name="name" value={formValues.name} onChange={changeHandler} />
                            <input data-aos="fade-left" data-aos-delay={200} placeholder="Your Email" type="email" required name="email" value={formValues.email} onChange={changeHandler} />{" "}
                            <input data-aos="fade-left" data-aos-delay={300} placeholder="Title" type="text" required name="title" value={formValues.title} onChange={changeHandler} />
                            <textarea data-aos="fade-left" data-aos-delay={400} placeholder="Your Message" type="text" required name="message" value={formValues.message} onChange={changeHandler} />
                            <motion.button {...btnClick} className=" hover:border-black border-2 w-40 py-1 text-white bg-black hover:bg-white hover:text-black duration-200" type="submit" value="send">
                                {sending ? "Sending..." : "Send Message"}
                            </motion.button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Contact;


