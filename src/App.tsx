import React from "react"
import './App.css'
import QRCode from "@pacta-app/qrcode-react"

const App = () => {
  enum Verify {
    INFO,
    LOADING,
    VERIFIED
  }
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
  const [state, setState] = React.useState(Verify.INFO)
  const format = date => date.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const [date1, date2, date3] = [new Date(), new Date(), new Date()]
  date1.setMonth(date1.getMonth() + 10)
  date2.setMonth(date2.getMonth() - 2)
  date2.setDate(date2.getDate() + 1)
  date3.setMonth(date3.getMonth() - 2)
  date3.setDate(date3.getDate() + 27)
  return (<>
    {state === Verify.INFO ? <button className="verify" onClick={() => { setState(Verify.LOADING); setTimeout(() => setState(Verify.VERIFIED), 2000) }}><svg viewBox="0 0 24 24">
      <path fill="currentColor" d="M2 12C2 16.97 6.03 21 11 21C13.39 21 15.68 20.06 17.4 18.4L15.9 16.9C14.63 18.25 12.86 19 11 19C4.76 19 1.64 11.46 6.05 7.05C10.46 2.64 18 5.77 18 12H15L19 16H19.1L23 12H20C20 7.03 15.97 3 11 3C6.03 3 2 7.03 2 12Z" />
    </svg></button> : null}
    <header>
      <svg viewBox="0 0 24 24">
        <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
      </svg>
      <div>COVID-ZERTIFIKAT</div>
    </header>
    <main onClick={() => setEdit(false)} onKeyDown={e => { if (e.key === "Enter") setEdit(false) }}>
      <div className={"cert" + (state === Verify.VERIFIED ? " verified" : "")}>
        {state === Verify.INFO ? null :
          state === Verify.LOADING
            ? <svg className="loading spinner" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
            </svg>
            : <svg className="loading checked" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
            </svg>}
        <QRCode
          size={1024}
          value="Sind alle impfwilligen erwachsenen Personen vollständig geimpft, beginnt die Normalisierungsphase. Der Bundesrat ist der Ansicht, dass dann keine starken gesellschaftlichen und wirtschaftlichen Einschränkungen mehr zu rechtfertigen sind. Die verbleibenden Massnahmen (Zugangs- und Kapazitätsbeschränkungen) sollen schrittweise aufgehoben werden. An dieser Strategie soll auch dann festgehalten werden, wenn die Impfbereitschaft der Bevölkerung entgegen der Erwartungen tief bleibt.

          Auch nach der Impfung aller impfbereiten Personen wird aber das Virus weiter zirkulieren. Es ist davon auszugehen, dass sich langfristig nicht-geimpfte und nicht-genesene Personen anstecken werden. Je grösser der Anteil dieser Personen ist, desto wahrscheinlicher dürften mögliche Ausbrüche sein, und desto höher wird auch die Zahl der schweren Krankheitsverläufe und Todesfälle ausfallen. Mit der kostenlosen Impfung steht eine hoch wirksame Möglichkeit zur Verfügung, sich individuell vor einer Ansteckung und einer Erkrankung zu schützen. Diese Tatsache wird der Bundesrat bei seinen zukünftigen Entscheiden berücksichtigen und gleichzeitig den persönlichen Impfentscheid jeder und jedes einzelnen respektieren."
        />
      </div>
      <div onClick={e => { e.stopPropagation(); setEdit(true) }}>
        <div className="name">
          {edit
            ? <input type="text" onChange={e => setName(e.target.value)} value={name} />
            : <div>{name}</div>}
        </div>
        <div className="date">
          {edit
            ? <input type="date" onChange={e => setBirthday(e.target.value)} value={birthday} />
            : <div>{format(new Date(birthday))}</div>}
        </div>
      </div>
      <div className={"info" + (state === Verify.VERIFIED ? " verified" : "")}>
        {state === Verify.INFO
          ? <svg className="loading" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13,9H11V7H13M13,17H11V11H13M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
          </svg>
          : state === Verify.LOADING
            ? <svg className="loading spinner" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12,4V2A10,10 0 0,0 2,12H4A8,8 0 0,1 12,4Z" />
            </svg>
            : <svg className="loading checked" viewBox="0 0 24 24">
              <path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" />
            </svg>}
        <div>Nur mit einem Ausweisdokument gültig</div>
      </div>
      <div className={"info" + (state === Verify.VERIFIED ? " verified" : "")}>
        <table>
          <tr>
            <td>Gültigkeit in der Schweiz</td>
            <td>bis <div className="fat">{format(date1)}</div></td>
          </tr>
        </table>
      </div>
      <div className="data">
        <div>IMPFUNG</div>
        <div>Vaccination</div>
        <div>Vaccination</div>
      </div>
      <div className="data">
        <div>2/2</div>
        <div>Impfdosis</div>
        <div>Dose</div>
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
      <div className="data">
        <div>{format(date2)}</div>
        <div>Impfdatum</div>
        <div>Date of Vaccination</div>
        <div>Schweiz / Switzerland</div>
        <div>Land der Impfung</div>
        <div>Country of Vaccination</div>
      </div>
      <div className="data">
        <div>Bundesamt für Gesundheit (BAG)</div>
        <div>Herausgeber</div>
        <div>Issuer</div>
        <div>urn:uvci:01:CH:4F39ED278D2382A768C746DB</div>
        <div />
        <div>UVCI</div>
      </div>
      <div className="issuing-date">
        <div>Zertifikat erstellt am {format(date3)}, 10:42</div>
        <div>Certificate generated on {format(date3)}, 10:42</div>
        <div>Date format used: dd:mm:yyyy</div>
      </div>
      <div className="info left">
        <div>Dieses Zertifikat ist kein Reisedokument.</div>
        <div>Die wissenschaftlichen Erkenntnisse über Covid-19-Impfungen und -Tests sowie über die Genesung von einer Covid-19-Infektion entwickeln sich ständig weiter, auch im Hinblick auf neue besorgniserregende Virusvarianten.</div>
        <div>Bitte informieren Sie sich vor der Reise über die am Zielort geltenden Gesundheitsmassnahmen und damit verbundenen Beschränkungen.</div>
      </div>
      <div className="menuitem">Zertifikat Light</div>
      <div className="menuitem">Exportieren</div>
    </main ></>)
}
export default App;
