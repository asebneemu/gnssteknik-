import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";  // SEO için Helmet'i kullanıyoruz

export default function SalesContentPage() {
  return (
    <div>
      <Helmet>
        <title>Satış İçeriklerimiz - GNSS Teknik | Teknolojik Ölçüm ve Haritalama Çözümleri</title>
        <meta
          name="description"
          content="GNSS Teknik olarak, satış içeriklerimizle en güncel GNSS, Total Station, Sensor çözümleri ve daha fazlasını keşfedin."
        />
        <meta
          name="keywords"
          content="satış içerikleri, GNSS, Total Station, Sensor, mühendislik çözümleri, haritalama"
        />
      </Helmet>
      
      <h1>Satış İçeriklerimiz</h1>
      <p>
        GNSS Teknik olarak sağladığımız satış içerikleriyle, inşaat, harita mühendisliği, tarım ve diğer sektörlere yönelik en ileri düzey ölçüm çözümlerini sunuyoruz.
      </p>

      {/* SEO dostu bağlantılar */}
      <ul>
        <li>
          <Link to="/category/gnss">GNSS Teknolojileri</Link>
        </li>
        <li>
          <Link to="/category/total-station">Total Station Çözümleri</Link>
        </li>
        <li>
          <Link to="/category/sensor">Sensor Çözümleri</Link>
        </li>
        <li>
          <Link to="/category/gnss/stec">STEc GNSS Çözümleri</Link>
        </li>
      </ul>
    </div>
  );
}
