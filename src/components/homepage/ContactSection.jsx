import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import emailjs from "emailjs-com"; // ✅ EmailJS Kütüphanesi
import "react-toastify/dist/ReactToastify.css";

const ContactSection = () => {
  return (
    <div className="w-10/12 mx-auto py-10">
      {/* Bize Ulaşın Başlığı */}


      {/* İletişim Formu ve Harita */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sol kutu - İletişim Formu */}
        <div className="bg-white p-6 shadow-lg rounded-lg w-full md:w-1/3">
          <ContactCard
            title="İletişim"
            description="Herhangi bir sorunuz varsa bizimle iletişime geçin."
            serviceId="service_general"
            templateId="template_general"
          />
        </div>

        {/* Sağ kutu - Harita */}
        <div className="w-full md:w-2/3 h-96">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Gnss Teknik, Ankara
          </h3>
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsSubmitting(true);

    emailjs
      .send(
        serviceId,
        templateId,
        { name: data.name, email: data.email, message: data.message },
        "YOUR_PUBLIC_KEY"
      )
      .then(() => {
        toast.success(`${title} formu başarıyla gönderildi! 📩`);
        reset();
      })
      .catch(() => {
        toast.error("Mesaj gönderilirken hata oluştu! ❌");
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
            required: "İsim alanı zorunludur",
            minLength: { value: 3, message: "İsim en az 3 karakter olmalıdır" },
          })}
          placeholder="Adınız"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

        <input
          type="email"
          {...register("email", {
            required: "Email alanı zorunludur",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Geçerli bir email girin",
            },
          })}
          placeholder="Email Adresiniz"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

        <textarea
          rows="4"
          {...register("message", {
            required: "Mesaj alanı zorunludur",
            minLength: {
              value: 10,
              message: "Mesaj en az 10 karakter olmalıdır",
            },
          })}
          placeholder="Mesajınız"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
        ></textarea>
        {errors.message && <p className="text-red-500 text-sm">{errors.message.message}</p>}

        <button
          type="submit"
          className={`w-full bg-blue-600 text-white py-3 rounded-lg shadow-md hover:bg-blue-700 transition ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Gönderiliyor..." : "Gönder"}
        </button>
      </form>
    </div>
  );
};

export default ContactSection;
