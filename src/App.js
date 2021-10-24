import React from "react"
import './App.css'
import QRCode from "@pacta-app/qrcode-react"

const App = () => {
  const useStickyState = (defaultValue, key) => {
    const [value, setValue] = React.useState(() => {
      const stickyValue = window.localStorage.getItem(key);
      return stickyValue !== null
        ? JSON.parse(stickyValue)
        : defaultValue;
    })
    React.useEffect(() => {
      window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])
    return [value, setValue];
  }
  const [edit, setEdit] = useStickyState(false, 'edit')
  const [name, setName] = useStickyState('Muster Peter (ändern)', 'name')
  const [birthday, setBirthday] = useStickyState("1970-01-01", 'birthday')
  const format = date => date.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const [date1, date2, date3] = [new Date(), new Date(), new Date()]
  date1.setMonth(date1.getMonth() + 10)
  date2.setMonth(date2.getMonth() - 2)
  date2.setDate(date2.getDate() + 1)
  date3.setMonth(date3.getMonth() - 2)
  date3.setDate(date3.getDate() + 27)
  return (
    <main onClick={() => setEdit(false)} onKeyDown={e => { if (e.key === "Enter") setEdit(false) }}>
      <header>
        COVID-ZERTIFIKAT
      </header>
      <div class="cert">
        <QRCode
          size={256}
          value="Sind alle impfwilligen erwachsenen Personen vollständig geimpft, beginnt die Normalisierungsphase. Der Bundesrat ist der Ansicht, dass dann keine starken gesellschaftlichen und wirtschaftlichen Einschränkungen mehr zu rechtfertigen sind. Die verbleibenden Massnahmen (Zugangs- und Kapazitätsbeschränkungen) sollen schrittweise aufgehoben werden. An dieser Strategie soll auch dann festgehalten werden, wenn die Impfbereitschaft der Bevölkerung entgegen der Erwartungen tief bleibt."
        />
      </div>
      <div onClick={e => { e.stopPropagation(); setEdit(true) }}>
        <div class="name">
          {edit
            ? <input type="text" onChange={e => setName(e.target.value)} value={name} />
            : <div>{name}</div>}
        </div>
        <div class="date">
          {edit
            ? <input type="date" onChange={e => setBirthday(e.target.value)} value={birthday} />
            : <div>{format(new Date(birthday))}</div>}
        </div>
      </div>
      <div class="info">Nur mit einem Ausweisdokument gültig</div>
      <div class="info">
        <table>
          <tr>
            <td>Gültigkeit in der Schweiz</td>
            <td>bis <div class="fat">{format(date1)}</div></td>
          </tr>
        </table>
      </div>
      <div class="data">
        <div>IMPFUNG</div>
        <div>Vaccination</div>
        <div>Vaccination</div>
        <div>Covid-19</div>
        <div>Krankheit oder Erreger</div>
        <div>Disease or agent targeted</div>
        <div>SARS-CoV-2 mRNA vaccine</div>
        <div>Art des Impfstoffs</div>
        <div>Vaccine type</div>
        <div>Comirnaty</div>
        <div>Produkt</div>
        <div>Product</div>
        <div>Biontech Manufactoring GmbH</div>
        <div>Hersteller</div>
        <div>Manufacturer</div>
      </div>
      <div class="data">
        <div>{format(date2)}</div>
        <div>Impfdatum</div>
        <div>Date of Vaccination</div>
        <div>Schweiz / Switzerland</div>
        <div>Land der Impfung</div>
        <div>Country of Vaccination</div>
      </div>
      <div class="data">
        <div>Bundesamt für Gesundheit (BAG)</div>
        <div>Herausgeber</div>
        <div>Issuer</div>
        <div>urn:uvci:01:CH:4F39ED278D2382A768C746DB</div>
        <div />
        <div>UVCI</div>
      </div>
      <div class="issuing-date">
        <div>Zertifikat erstellt am {format(date3)}, 10:42</div>
        <div>Certificate generated on {format(date3)}, 10:42</div>
        <div>Date format used: dd:mm:yyyy</div>
      </div>
      <div class="info left">
        <div>Dieses Zertifikat ist kein Reisedokument.</div>
        <div>Die wissenschaftlichen Erkenntnisse über Covid-19-Impfungen und -Tests sowie über die Genesung von einer Covid-19-Infektion entwickeln sich ständig weiter, auch im Hinblick auf neue besorgniserregende Virusvarianten.</div>
        <div>Bitte informieren Sie sich vor der Reise über die am Zielort geltenden Gesundheitsmassnahmen und damit verbundenen Beschränkungen.</div>
      </div>
      <div class="menuitem">Zertifikat Light</div>
      <div class="menuitem">Exportieren</div>
    </main >)
}
export default App;
