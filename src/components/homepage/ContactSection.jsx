import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import emailjs from "emailjs-com"; // ✅ EmailJS Kütüphanesi
import "react-toastify/dist/ReactToastify.css";
import { useLanguage } from "../../context/LanguageContext"; // Dil desteği için ekledik

const ContactSection = () => {
  const { language } = useLanguage(); // Dil seçimini alıyoruz

  // Dil seçimine göre metinler
  const contactTitle = language === "tr" ? "İletişim" : "Contact";
  const contactDescription =
    language === "tr"
      ? "Herhangi bir sorunuz varsa bizimle iletişime geçin."
      : "If you have any questions, feel free to contact us.";
  const mapTitle = language === "tr" ? "Gnss Teknik, Ankara" : "Gnss Teknik, Ankara";

  return (
    <div id="contact-section" className="w-10/12 mx-auto py-10">

      {/* İletişim Formu ve Harita */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sol kutu - İletişim Formu */}
        <div className="bg-white p-6 shadow-lg rounded-lg w-full md:w-1/3">
          <ContactCard
            title={contactTitle}
            description={contactDescription}
            serviceId="service_ft3q3bn"
            templateId="template_tzg0aik"
          />
        </div>

        {/* Sağ kutu - Harita */}
        <div className="w-full md:w-2/3 h-96">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">{mapTitle}</h3>
          <div className="w-full h-full">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3060.491478248614!2d32.8167524!3d39.9080163!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14d34f56df7bdcbb%3A0xc572d2663131af7b!2sGnss%20Harita%20Teknik%20Dan.%20San.%20ve%20Tic.%20A.%C5%9E.!5e0!3m2!1str!2str!4v1741067710603!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactCard = ({ title, description, serviceId, templateId }) => {
  const { language } = useLanguage(); // Dil seçimini alıyoruz
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Dil seçimine göre metinler
  const namePlaceholder = language === "tr" ? "Adınız" : "Your Name";
  const emailPlaceholder = language === "tr" ? "Email Adresiniz" : "Your Email";
  const messagePlaceholder = language === "tr" ? "Mesajınız" : "Your Message";
  const submitButtonText = language === "tr" ? "Gönder" : "Send";
  const submittingText = language === "tr" ? "Gönderiliyor..." : "Submitting...";
  const successMessage = language === "tr" ? `${title} formu başarıyla gönderildi! 📩` : `${title} form submitted successfully! 📩`;
  const errorMessage = language === "tr" ? "Mesaj gönderilirken hata oluştu! ❌" : "An error occurred while sending the message! ❌";

  const onSubmit = (data) => {
    setIsSubmitting(true);

    emailjs
      .send(
        serviceId,
        templateId,
        { name: data.name, email: data.email, message: data.message },
        "RLfviTv9dMouNhsYS"
      )
      .then(() => {
        toast.success(successMessage);
        reset();
      })
      .catch(() => {
        toast.error(errorMessage);
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          type="text"
          {...register("name", {
            required: language === "tr" ? "İsim alanı zorunludur" : "Name is required",
            minLength: {
              value: 3,
              message: language === "tr" ? "İsim en az 3 karakter olmalıdır" : "Name must be at least 3 characters",
            },
          })}
          placeholder={namePlaceholder}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input
          type="email"
          {...register("email", {
            required: language === "tr" ? "Email alanı zorunludur" : "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: language === "tr" ? "Geçerli bir email girin" : "Enter a valid email",
            },
          })}
          placeholder={emailPlaceholder}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <textarea
          rows="4"
          {...register("message", {
            required: language === "tr" ? "Mesaj alanı zorunludur" : "Message is required",
            minLength: {
              value: 10,
              message: language === "tr" ? "Mesaj en az 10 karakter olmalıdır" : "Message must be at least 10 characters",
            },
          })}
          placeholder={messagePlaceholder}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        ></textarea>
        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? submittingText : submitButtonText}
        </button>
      </form>
    </div>
  );
};

export default ContactSection;
