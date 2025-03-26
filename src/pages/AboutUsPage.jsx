import React from "react";

const AboutUsSection = ({ title, paragraphs }) => {
  return (
    <div className="w-[80%] mx-auto mb-16">
      <h2 className="text-4xl font-bold mb-8 text-left">{title}</h2>
      <div className="flex flex-col gap-6">
        {paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-base leading-relaxed text-gray-700"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
      </div>
    </div>
  );
};

const PartnersSection = ({ logos }) => {
  return (
    <div className="w-[80%] mx-auto mb-16">
      <h2 className="text-4xl font-bold mb-8 text-left">Çözüm Ortaklarımız</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 place-items-center">
        {logos.map((logo, index) => (
          <a
            key={index}
            href={logo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-transform hover:scale-105"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="w-full h-auto object-contain max-h-24"
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default function AboutUsPage() {
  return (
    <div className="py-10">
      <AboutUsSection
        title="Hakkımızda"
        paragraphs={[
          "Firmamız, <b>2008 yılında</b> kurulmuş olup, <b>2012 yılında</b> yeni bir yapılanmaya giderek <b>GNSS teknolojileri</b> firmalarından <b>CHCNAV</b> ile iş birliği yapmaya başlamıştır. Aynı dönemde el tipi <b>GNSS çözümleri</b> sunan <b>BHC</b> firması ile anlaşmaya vararak Türkiye yetkili satıcısı olmuştur. Mobil <b>GBS (GIS)</b> çözümleri için <b>Digiterra</b> firması ile görüşmeler gerçekleştirilmiş ve yazılım alanında geniş bir ürün yelpazesi oluşturularak konumsal çözümler sunulmaya başlanmıştır. <b>2019 yılında DJI Enterprise</b> bayisi olarak yetkilendirilmiş ve hemen ardından <b>3D Survey Fotoğraf Değerleme ve Harita Üretim yazılımı</b>nın da yetkili satıcısı olarak ürün portföyünü genişletmiştir. <b>2025 yılı itibarıyla</b> <b>Stec GNSS, Total Station ve Lidar</b> gibi birçok ürün yelpazesine sahip markanın Türkiye'de tek yetkili satıcısı olmuştur. Ayrıca <b>Senceive, Benewake ve Autel Robotics</b> gibi alanında lider firmalar da ürün gamımıza eklenmiştir.",
          "<b>GNSS teknolojilerinin hızla geliştiği dönemde</b>, Türkiye'de gerçekleştirilen büyük ölçekli <b>GNSS ihaleleri</b>nin tamamını kazanarak sektördeki gücünü pekiştirmiştir. <b>%100 müşteri memnuniyeti</b> ilkesi doğrultusunda ekibini genişletmiş, yeni şubeler açmış ve <b>TSE belgeli servis hizmetini</b> hayata geçirmiştir. Türkiye <b>GNSS pazarı</b>nda hızla yükselerek ciro açısından en büyük üç firma arasına girmiş, satış adetlerinde ise lider konuma ulaşmayı başarmıştır.",
          "<b>Konumlama, navigasyon ve haritalama</b> alanlarında; <b>GNSS, INS, Referans İstasyonları, RTK tabletler</b> ve <b>mobil GNSS çözümleri</b> sunmaktayız. Ayrıca <b>Batimetri, İnsansız Deniz Araçları, Total Station ve Robotik Sistemler, Deformasyon Çözümleri, İnsansız Hava Araçları</b> ve yazılım çözümlerine ek olarak <b>Lidar teknolojileri</b> ile kapsamlı çözümler sağlamaktayız.",
          "<b>Yeni yıl itibarıyla</b> uzmanlık alanlarımızı daha da genişleterek <b>BIM (Yapı Bilgi Modellemesi), Yapı Sağlığı İzleme Sistemleri, Makine Kontrol Sistemleri</b> ve <b>ADAS (Otonom Sürüş) Sensör Çözümleri</b> gibi birçok farklı mühendislik disiplininde faaliyet göstermeye başladık. <b>Yenilikçi ve teknoloji odaklı yaklaşımımızla</b> sektöre öncülük etmeye devam ediyoruz.",
        ]}
      />

      <AboutUsSection
        title="Vizyonumuz"
        paragraphs={[
          "<b>Her koşulda yanınızdayız...</b>",
          "Hedef kitlemiz tarafından en çok tercih edilen, rekabetçi ürünleriyle fark yaratan; kaliteli ve sürdürülebilir hizmet anlayışıyla kalıcılığını sağlayan, temsil ettiği markalarla değer katan ve sektöründe lider bir şirket olmayı hedefliyoruz.",
        ]}
      />

      <AboutUsSection
        title="Misyonumuz"
        paragraphs={[
          "<b><i>Müşterilerimize en yüksek değeri sunmak için varız.</i></b>",
          "GNSS Teknik olarak; <b>ölçme ve mühendislik, mobil haritalama ve geospatial, deniz ölçmeleri ve inşaat, navigasyon ve altyapı çözümleri</b> alanlarında uzman ekibimizle kapsamlı çözümler sunuyoruz. <b>Satış, satış sonrası ve teknik destek</b> süreçlerinde en yüksek kalite standartlarını hedefleyerek, müşteri memnuniyetini ön planda tutuyoruz.",
        ]}
      />

      <AboutUsSection
        title="Değerlerimiz"
        paragraphs={[
          "<b>Vizyonumuzu gerçekleştirmek için</b> tüm çalışmalarımızı <b>tutku, dürüstlük, girişimcilik ve yenilikçilik</b> ilkeleriyle şekillendiriyoruz. Bu değerler, yalnızca yolumuzu değil, aynı zamanda kurum kültürümüzü de belirlemektedir.",
          "<b>Başarının Anahtarı:</b> Gelişen teknolojileri yakından takip ediyor, uzman kadromuzla kullanıcılarımıza en yeni ve en etkili çözümleri sunuyoruz. Türkiye’de ve temsilciliklerimizde markalaşmayı, kendi markamıza sürekli değer katmayı hedefliyoruz.",
          "<b>Farkındalık:</b> Bireysel gelişimin gücüne inanıyor, kişisel farkındalık ile hem kendimizi hem müşterilerimizi daha ileriye taşıyoruz. İhtiyaçları doğru analiz ederek özveriyle çözüm üretiyoruz.",
          "<b>Yenilikçilik ve Açık Fikirli Yaklaşım:</b> Müşterilerimizin değişen beklentilerine uyum sağlamak için yenilikçi, dinamik ve akılcı çözümler geliştiriyoruz. İleri teknoloji ve güçlü yönetim anlayışımızla projelerimizin merkezine sürekli gelişimi yerleştiriyoruz.",
          "<b>Güven ve Samimiyet:</b> Güvenilirlik ve dürüstlük en kıymetli değerlerimizdir. GNSS Teknik olarak her projede samimi ilişkiler kurar, uzun vadeli güven inşa ederiz. Müşterilerimizle güçlü ve kalıcı bağlar kurmak en büyük önceliğimizdir.",
        ]}
      />

      <PartnersSection
        logos={[
          {
            src: "/logos/paksoy.png",
            alt: "PAKSOY Logo",
            url: "https://paksoyteknik.com.tr/",
          },
          {
            src: "/logos/3bharita.webp",
            alt: "3B HARİTA Logo",
            url: "https://4bharita.com.tr/",
          },
          // İstersen yeni ortakları buraya ekleyebilirsin
        ]}
      />
    </div>
  );
}
