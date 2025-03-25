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
          <img
            key={index}
            src={logo.src}
            alt={logo.alt}
            className="w-full h-auto object-contain max-h-24 transition-transform hover:scale-105"
          />
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
          "Firmamız, <b>2008 yılında</b> kurulmuş olup, <b>2012 yılında</b> yeni bir yapılanmaya giderek <i>GNSS teknolojileri</i> alanında dünyanın önde gelen firmalarından <b>CHCNAV</b> ile iş birliği yapmaya başlamıştır. Aynı dönemde el tipi <i>GNSS çözümleri</i> sunan <b>BHC</b> firması ile anlaşmaya vararak Türkiye yetkili satıcısı olmuştur. Mobil <i>GBS (GIS)</i> çözümleri için <b>Digiterra</b> firması ile görüşmeler gerçekleştirilmiş ve yazılım alanında geniş bir ürün yelpazesi oluşturularak konumsal çözümler sunulmaya başlanmıştır. <b>2019 yılında DJI Enterprise</b> bayisi olarak yetkilendirilmiş ve hemen ardından <b>3D Survey Fotoğraf Değerleme ve Harita Üretim yazılımı</b>nın da yetkili satıcısı olarak ürün portföyünü genişletmiştir. <b>2025 yılı itibarıyla</b> <b>Senceive, Benewake, Stec</b> ve <b>Autel Robotics</b> gibi alanında lider firmalar da ürün gamımıza eklenmiştir.",
          "<b>GNSS teknolojilerinin hızla geliştiği dönemde</b>, Türkiye'de gerçekleştirilen büyük ölçekli <i>GNSS ihaleleri</i>nin tamamını kazanarak sektördeki gücünü pekiştirmiştir. <b>%100 müşteri memnuniyeti</b> ilkesi doğrultusunda ekibini genişletmiş, yeni şubeler açmış ve <b>TSE belgeli servis hizmeti</b>ni hayata geçirmiştir. Türkiye <i>GNSS pazarı</i>nda hızla yükselerek ciro açısından en büyük üç firma arasına girmiş, satış adetlerinde ise lider konuma ulaşmayı başarmıştır.",
          "<b>Konumlama, navigasyon ve haritalama</b> alanlarında; <i>GNSS, INS, Referans İstasyonları, RTK tabletler</i> ve <i>mobil GNSS çözümleri</i> sunmaktayız. Ayrıca <i>Batimetri, İnsansız Deniz Araçları, Total Station ve Robotik Sistemler, Deformasyon Çözümleri, İnsansız Hava Araçları</i> ve yazılım çözümlerine ek olarak <i>Lidar teknolojileri</i> ile kapsamlı çözümler sağlamaktayız.",
          "<b>Yeni yıl itibarıyla</b> uzmanlık alanlarımızı daha da genişleterek <i>BIM (Yapı Bilgi Modellemesi), Yapı Sağlığı İzleme Sistemleri, Makine Kontrol Sistemleri</i> ve <i>ADAS (Otonom Sürüş) Sensör Çözümleri</i> gibi birçok farklı mühendislik disiplininde faaliyet göstermeye başladık. <b>Yenilikçi ve teknoloji odaklı yaklaşımımızla</b> sektöre öncülük etmeye devam ediyoruz.",
        ]}
      />

      <AboutUsSection
        title="Vizyonumuz"
        paragraphs={[
          "<b>Her koşulda yanınızdayız...</b>",
          "Rekabet yaratan ürünleriyle hedef kitle tarafından en çok tercih edilen, kattığı değerle sürekli, kaliteli ürün ve hizmetleriyle kalıcılık sağlayan, temsil etmekte olduğu markalar ve fark yaratan hizmet anlayışı ile alanında lider şirket olmak.",
        ]}
      />

      <AboutUsSection
        title="Misyonumuz"
        paragraphs={[
          "<b><i>Müşterilerimiz için maksimum değer yaratmak için varız.</i></b>",
          "GNSS Teknik, alanlarında tecrübe sahibi uzman çalışanları ile <i>ölçme ve mühendislik</i>, <i>mobil haritalama & geospatial</i>, <i>deniz ölçmeleri & inşaat</i>, <i>navigasyon & altyapı</i> çözümleri konusunda kapsamlı çözümler üretmeyi; satış, satış sonrası ve teknik destek hizmetlerini en üst düzeyde sunmayı görev edinmiştir.",
        ]}
      />

      <AboutUsSection
        title="Değerlerimiz"
        paragraphs={[
          "Vizyonumuzu gerçekleştirmek için çalışmalarımızda tutku, dürüstlük, girişimcilik ve yenilikle güçlenmeyi planlıyoruz. Bu değerler, yaptığımız her şeyde bize rehberlik etmekte ve kuruluşumuzun temelini oluşturmaktadır.",
          "<b><i>Başarının anahtarı:</i></b> Dünyada gelişmekte olan ve kullanıcılarımıza değer katacağına inandığımız en güncel teknolojilerden uzman personelimizle en iyiye, müşteri memnuniyetine değer verip getiriyoruz. Türkiye'de ve temsilciliklerimizde markalaşmak ve kendi markamıza değer katmak için sürekli araştırıyoruz.",
          "<b><i>Farkındalık:</i></b> Kişisel farkındalığın amaca kendimizi sürekli geliştirmekte ve bireysel gelişim ihtiyacımızı belirlemekte. Kendimiz gibi müşterilerimizin de ihtiyaca ve çözüm arayışlarında bu farkındalık ve özveri hedef noktamız olmaktadır.",
          "<b>Açık fikirli ve yenilikçiyiz:</b> Müşterilerimizin ihtiyaçlarını daha iyi karşılamak için akılcı, dinamik, yenilikçi ve açık fikirliyiz. İleri teknoloji, ürünler, çözümlerle yönetim, projelerin ana ekseninde olduğumuzu anlam kazanacağını biliyoruz.",
          "<b>Samimi ve güvenilirlik:</b> Güven ve dürüstlük en önemli maddi olmayan varlıklarımızdır. GNSS TEKNİK her zaman tüm projelerinde öncü ve samimiyet ve sonuna güveni inşa etmektedir.",
        ]}
      />

      <PartnersSection
        logos={[
          { src: "/logos/paksoy.png", alt: "PAKSOY Logo" },
          { src: "/logos/paksoy.png", alt: "DJI Logo" },
          { src: "/logos/paksoy.png", alt: "Autel Robotics Logo" },
          { src: "/logos/paksoy.png", alt: "Senceive Logo" },
          // daha sonra eklemek istersen buraya yenilerini eklersin
        ]}
      />
    </div>
  );
}
