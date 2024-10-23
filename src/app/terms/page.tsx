"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import DocumentPurpleIcon from "../../assets/icons/document-purple.svg";

const Terms = () => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (!isChecked) {
      e.preventDefault();
    }
  };

  return (
    <div className="flex flex-col items-center w-screen h-screen gap-8 p-6  lg:p-10">
      <div className="flex items-center gap-4 text-purple">
        <Image
          src={DocumentPurpleIcon}
          height={28}
          width={28}
          alt="document icon"
        />{" "}
        Terms & Conditions
      </div>
      <div className="pr-1  rounded-2xl  bg-white max-h-[75svh] max-w-5xl ">
        <div className="p-4 text-base  w-full flex flex-col gap-4 overflow-y-auto h-full">
          {" "}
          <section>
            <h2 className="mb-4 font-semibold">Terms of Use</h2>
            <p>
              Welcome to StoryCloud (&quot;the App&quot;). By using this app,
              you agree to be bound by the following terms and conditions
              (&quot;Terms of Use&quot;). Please read these terms of use
              carefully before using the app.
            </p>
          </section>
          <section>
            <h3 className="font-semibold">Acceptance of Terms</h3>
            <p>
              By accessing and using the app, you agree to these terms of use,
              and any other terms, policies, or guidelines incorporated by
              reference.
            </p>
          </section>
          <section>
            <h3 className="font-semibold">Use of the App</h3>
            <ol className="list-decimal px-6">
              <li>You must be at least 13 years old to use this app.</li>
              <li>
                You may only use the app for the purpose of recording and
                sharing personal memories, and in accordance with these terms of
                use.
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-semibold">Intellectual Property</h3>
            <p>
              All content, features, and functionality of the app are owned by
              or licensed to us and are protected by international copyright,
              trademark, patent, trade secret, and other intellectual property
              or proprietary rights laws.
            </p>
          </section>
          <section>
            <h3 className="font-semibold">Privacy</h3>
            <p>Your use of the app is subject to our privacy policy.</p>
          </section>
          <section>
            <h3 className="font-semibold">User Content</h3>
            <ol className="list-decimal px-6">
              <li>
                You are solely responsible for any data, text, graphics, photos,
                profiles, audio and video clips, links, and other content
                (collectively, &quot;User Content&quot;) that you submit, post,
                or display on the app.
              </li>
              <li>
                You grant us a non-exclusive, transferable, sub-licensable,
                royalty-free, worldwide license to use, reproduce, modify,
                adapt, publish, translate, create derivative works from,
                distribute, and display your user content.
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-semibold">Prohibited Activities</h3>
            <p>You agree not to engage in any of the following activities:</p>
            <ol className="ml-6 list-decimal">
              <li>Violating laws or regulations.</li>
              <li>
                Impersonating any person or entity, or falsely stating or
                otherwise misrepresenting your affiliation with a person or
                entity.
              </li>
              <li>
                Posting or transmitting any content that is unlawful, harmful,
                threatening, abusive, harassing, defamatory, vulgar, obscene, or
                invasive of another&apos;s privacy.
              </li>

              <li>
                Using any robot, spider, or other automatic device, process, or
                means to access the app for any purpose, including monitoring or
                copying any material on the app.
              </li>
              <li>
                Introducing any viruses, trojan horses, worms, logic bombs, or
                other material that is malicious or technologically harmful.
              </li>
            </ol>
          </section>
          <section>
            <h3 className="font-semibold">Limitation of Liability</h3>
            <p>
              In no event shall StoryCloud, its officers, directors, employees,
              or agents, be liable to you for any indirect, consequential,
              exemplary, incidental, special, or punitive damages, including
              lost profits.
            </p>
          </section>
          <section>
            <h3 className="font-semibold">Termination</h3>
            <p>
              We may terminate or suspend your access to the app immediately,
              without prior notice or liability, for any reason.
            </p>
          </section>
          <section>
            <h3 className="font-semibold">Changes to Terms</h3>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these terms of use at any time.
            </p>
          </section>
          <section>
            <h3 className="font-semibold">Contact Us</h3>
            <p>
              If you have any questions or concerns about these terms of use,
              please contact us at cloudofstories@gmail.com.
            </p>
          </section>
          <section>
            <h3 className="font-semibold">Privacy Policy for StoryCloud</h3>
            <p>
              This privacy policy describes how StoryCloud collects, uses, and
              shares your personal information when you use our mobile
              application (the &quot;App&quot;).
            </p>
          </section>
          <section>
            <h4 className="font-semibold">Information We Collect</h4>
            <ol className="ml-6 list-decimal">
              <li>
                User-Provided Information: We may collect information that you
                provide directly to us when using the app, such as your name,
                email address, and profile information.
              </li>
              <li>
                Recorded Content: Any audio recordings, images, videos, or other
                content you choose to upload to the app.
              </li>
              <li>
                Device Information: We may collect information about the device
                you use to access the app, including the hardware model,
                operating system, and unique device identifiers.
              </li>
              <li>
                Usage Information: We may collect information about your use of
                the app, including the date and time of your interactions.
              </li>
            </ol>
          </section>
          <section>
            <h4 className="font-semibold">How We Use Your Information</h4>
            <ol className="ml-6 list-decimal">
              <li>
                To Provide and Improve the App: We use your information to
                provide and enhance the features, functionality, and user
                experience of the app.
              </li>
              <li>
                To Communicate with You: We may use your email address to send
                you updates, newsletters, or respond to your inquiries.
              </li>
              <li>
                For Research and Analytics: We may analyze user behavior and
                trends to improve the app.
              </li>
            </ol>
          </section>
          <section>
            <h4 className="font-semibold">Sharing Your Information</h4>
            <p>
              We will not share your personal information with third parties,
              except as described in this privacy policy or with your consent.
            </p>
          </section>
          <section>
            <h4 className="font-semibold">Security</h4>
            <p>
              We take reasonable measures to help protect your personal
              information from unauthorized access, use, or disclosure.
            </p>
          </section>
          <section>
            <h4 className="font-semibold">Children&apos;s Privacy</h4>
            <p>
              The app is not intended for use by children under the age of 13.
              We do not knowingly collect personal information from children.
            </p>
          </section>
          <section>
            <h4 className="font-semibold">Changes to this Privacy Policy</h4>
            <p>
              We may update this privacy policy to reflect changes to our
              practices or for other operational, legal, or regulatory reasons.
            </p>
          </section>
          <section>
            <h4 className="font-semibold">Contact Us</h4>
            <p>
              If you have any questions about this privacy policy, please
              contact us at cloudofstories@gmail.com.
            </p>
          </section>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between w-full max-w-5xl gap-4 md:items-center md:flex-row">
        <div className="flex items-center self-start gap-4">
          <div className="relative flex items-center gap-2">
            <label
              htmlFor="some_id"
              className="relative flex items-center cursor-pointer"
            >
              <input
                type="checkbox"
                id="some_id"
                onChange={handleCheckboxChange}
                className="relative flex items-center justify-center w-8 h-8 p-2 bg-white border-0 rounded-sm appearance-none md:w-11 md:h-11 peer shrink-0 checked:bg-white"
              />
              <svg
                className={`absolute w-4 h-4 transform -translate-x-1/2 -translate-y-1/2 md:w-6 md:h-6 top-1/2 left-1/2 ${
                  isChecked ? "peer-checked:block" : "hidden"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </label>
          </div>

          <p>I acknowledge and agree to the terms & conditions</p>
        </div>
        <Link
          href={isChecked ? "/signup" : "#"}
          className={`flex items-center justify-center w-full h-8 bg-white  text-purple max-w-36 md:max-w-64 ${
            isChecked ? "" : "opacity-65 cursor-not-allowed"
          }`}
          onClick={handleClick}
        >
          proceed
        </Link>
      </div>
    </div>
  );
};

export default Terms;
