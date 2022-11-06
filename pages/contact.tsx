import type { NextPage } from "next";
import Script from "next/script";

const Contact: NextPage = () => {
    return (
        <div className="flex justify-center p-10">
            <form action="https://api.web3forms.com/submit" method="POST" id="form" className="mb-2 w-full grid gap-10 grid-cols-1">
                <input type="hidden" name="access_key" value="f0915929-7a1a-4b0f-8706-96c9ba786e73" />
                <input type="hidden" name="subject" value="" />
                <input type="checkbox" name="botcheck" id="" style={{ display: "none" }} />
                <h2 className="text-center text-2xl font-extrabold">Contact ThorType</h2>
                <div className="text-center">
                    Fill out the form below. &nbsp;
                    <a href="mailto:thor@thortype.com">If you&apos;re having trouble with the form, you can contact ThorType by sending an email to thor@thortype.com</a>
                </div>
                <div>
                    <label className="block mb-2 text-sm text-gray-600" htmlFor="fname" >First Name</label>
                    <input className="w-full px-3 py-2 h-12 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none" type="text" name="name" id="first_name" required />
                    <label className="block mb-2 text-sm text-gray-600" htmlFor="lname" >Last Name</label>
                    <input className="w-full px-3 py-2 h-12 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none" type="text" name="last_name" id="lname" required />
                    <label className="block mb-2 text-sm text-gray-600" htmlFor="email" >Email Address</label>
                    <input className="w-full px-3 py-2 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none" type="email" name="email" id="email" required />
                    <label className="block mb-2 text-sm text-gray-600" htmlFor="message" >Your Message</label>
                    <textarea rows={5} className="w-full px-3 py-2 rounded-sm placeholder-gray-500 text-gray-900 bg-gray-100 text-sm focus:outline-none" name="message" id="message" required></textarea>
                </div>
                <div >
                    <button className="w-full bg-indigo-600 inline-block text-white no-underline hover:text-indigo-100 py-4 px-4 rounded-sm focus:outline-none" type="submit" >Send Message</button>
                </div>
                <p id="result"></p>
            </form>
        </div>
    )
}

export default Contact;