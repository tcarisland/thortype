import type { NextPage } from "next";
import Script from "next/script";

const Contact: NextPage = () => {
    return(
        <div className=".text-gray-900">
            <Script src="/static/scripts/contact.js" id="contactscript" strategy="beforeInteractive" defer={false}/>
            <div className="flex items-center min-h-screen bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto">
                <div className="max-w-xl mx-auto my-10 p-5 rounded-md shadow-sm">
                <div className="text-center">
                    <h1 className="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-300">
                    Contact ThorType
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                    Fill out the form below.
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                    <a href="mailto:thor@thortype.com">If you&apos;re having trouble with the form, you can contact ThorType by sending an email here.</a>  
                    </p>
                </div>
                <div className="m-7">
                    <form action="https://api.web3forms.com/submit" method="POST" id="form" className="needs-validation" noValidate>
                    <input type="hidden" name="access_key" value="f0915929-7a1a-4b0f-8706-96c9ba786e73" />
                    <input type="hidden" name="subject" value="" />
                    <input type="checkbox" name="botcheck" id="" style={{display: "none"}} />

                    <div className="flex mb-6 space-x-4">
                        <div className="w-full md:w-1/2">
                        <label htmlFor="fname" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">First Name</label>
                        <input type="text" name="name" id="first_name" required className="w-full px-3 py-2 placeholder-gray-300 border-2 border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" />
                        <div className="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
                            Please provide your first name.
                        </div>
                        </div>
                        <div className="w-full md:w-1/2">
                        <label htmlFor="lname" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Last Name</label>
                        <input type="text" name="last_name" id="lname" required className="w-full px-3 py-2 placeholder-gray-300 border-2 border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" />
                        <div className="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
                            Please provide your last name.
                        </div>
                        </div>
                    </div>

                    <div className="flex mb-6 space-x-4">
                        <div className="w-full md:w-1/2">
                        <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                        <input type="email" name="email" id="email" required className="w-full px-3 py-2 placeholder-gray-300 border-2 border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" />
                        <div className="empty-feedback text-red-400 text-sm mt-1">
                            Please provide your email address.
                        </div>
                        <div className="invalid-feedback text-red-400 text-sm mt-1">
                            Please provide a valid email address.
                        </div>
                        </div>

                        <div className="w-full md:w-1/2">

                        <div className="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
                            Please provide your phone number.
                        </div>
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Your Message</label>

                        <textarea rows={5} name="message" id="message" className="w-full px-3 py-2 placeholder-gray-300 border-2 border-gray-200 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300" required></textarea>
                        <div className="empty-feedback invalid-feedback text-red-400 text-sm mt-1">
                        Please enter your message.
                        </div>
                    </div>
                    <input type="checkbox" name="botcheck" className="hidden" style={{display: "none"}}></input>
                    <div className="mb-6">
                        <button type="submit" className="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">
                        Send Message
                        </button>
                    </div>
                    <p className="text-base text-center text-gray-400" id="result"></p>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Contact;