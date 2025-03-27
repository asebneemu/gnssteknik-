
import json
from deep_translator import GoogleTranslator

# data-tr.json dosyasını yükle
with open('data-tr.json', 'r', encoding='utf-8') as file:
    data_tr = json.load(file)

translator = GoogleTranslator(source='tr', target='en')

# Çeviri fonksiyonu
def translate_field(text):
    try:
        return translator.translate(text)
    except:
        return text

# products isimlerini çevir
for product in data_tr['products']:
    product['name'] = translate_field(product['name'])

# mainNavbar başlıkları ve açıklamaları çevir
for item in data_tr['mainNavbar']:
    item['title'] = translate_field(item['title'])
    item['description'] = translate_field(item['description'])

# socialLinks isimlerini çevir
for link in data_tr['socialLinks']:
    link['name'] = translate_field(link['name'])

# Çevrilmiş veriyi data-en.json olarak kaydet
with open('data-en.json', 'w', encoding='utf-8') as file:
    json.dump(data_tr, file, ensure_ascii=False, indent=2)

print("İngilizce çeviri tamamlandı ve data-en.json olarak kaydedildi.")
