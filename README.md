## Logsign `UI Development Challenge`

### Hedef

Calisanlara atanmis caselerin listenelebilgidi, yeni case ekleyebilecegimiz, guncelleyebilecegimiz ve silebilecegimiz  bir `React` uygulamasi gelistirilmesi.<br>

Case Form olusturulurken herhangi bir form kutuphanesinden faydalinabilir. (redux-form, formsy-react, antd) fakat capabilities field icin mutlak react-jsonschema-form kutuphanesi kullanilmalidir.
(https://react-jsonschema-form.readthedocs.io/en/latest/)


Uygulamanın development mode da çalışması `UI Development Challenge` kapsamında yeterlidir, deployment beklentisi bulunmamaktadır.<br>
Uygulamanın modern/güncel browserlarda görüntülenebilmesi yeterlidir.<br>

### `npm run dev`

Uygulamayı development mode da başlatır.<br>
Görüntülemek için: [http://localhost:3000](http://localhost:3000)

UI uygulaması ile beraber, agent ve case lerin listelenebildiği Fake REST API ([json-server](https://github.com/typicode/json-server)) çalıştırır. <br>
[http://localhost:3004](http://localhost:3004)

Geliştirme esnasında bu API aracılığı ile agent / case listeleyebilir, silebilir, ekleyebilir ya da güncelleyebilirsiniz.

```
GET    /cases
GET    /cases/1
POST   /cases
PUT    /cases/1
PATCH  /cases/1
DELETE /cases/1
GET    /agents
```

### Örnek / Beklenen case listeleme ekleme ve duzenleme sayfalari mockup lari

https://www.figma.com/file/UXkgxzbBixM1XHgyERRxlo/ui-case?node-id=0%3A1

### Not

Proje kapsamında işinizi kolaylaştırabileceğini düşündüğünüz, ihtiyaç duyduğunuz herhangi bir teknolojiyi (React-FlexBox-Grid, redux, mobx, react-hooks, react-forms, react-bootstrap, styled-component vb.) kullanmaktan çekinmeyin.

Herhangi bir state manager kullanmaniz case degerlendirmesi acisindan olumlu olacaktir.(Redux mobx vs...)

json-schema-form kutuphanesi kullanilmasi ve entegre edilmesi case degerlendirilmesi acisindan onemlidir.

Component testlerinin yazilmasi case degerlendirmesi acisindan artidir.
  

`UI Development Challenge` projesinin işlevselliğini yitirmemesi için yaptığınız çalışmayı üçüncü kişilerle paylaşmamanızı rica ederiz.
