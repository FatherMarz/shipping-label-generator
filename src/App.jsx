import { useState } from 'react'
import './App.css'

const CA_REGIONS = [
  ['AB', 'Alberta'],
  ['BC', 'British Columbia'],
  ['MB', 'Manitoba'],
  ['NB', 'New Brunswick'],
  ['NL', 'Newfoundland and Labrador'],
  ['NS', 'Nova Scotia'],
  ['NT', 'Northwest Territories'],
  ['NU', 'Nunavut'],
  ['ON', 'Ontario'],
  ['PE', 'Prince Edward Island'],
  ['QC', 'Quebec'],
  ['SK', 'Saskatchewan'],
  ['YT', 'Yukon'],
]

const US_REGIONS = [
  ['AL', 'Alabama'],
  ['AK', 'Alaska'],
  ['AZ', 'Arizona'],
  ['AR', 'Arkansas'],
  ['CA', 'California'],
  ['CO', 'Colorado'],
  ['CT', 'Connecticut'],
  ['DE', 'Delaware'],
  ['DC', 'District of Columbia'],
  ['FL', 'Florida'],
  ['GA', 'Georgia'],
  ['HI', 'Hawaii'],
  ['ID', 'Idaho'],
  ['IL', 'Illinois'],
  ['IN', 'Indiana'],
  ['IA', 'Iowa'],
  ['KS', 'Kansas'],
  ['KY', 'Kentucky'],
  ['LA', 'Louisiana'],
  ['ME', 'Maine'],
  ['MD', 'Maryland'],
  ['MA', 'Massachusetts'],
  ['MI', 'Michigan'],
  ['MN', 'Minnesota'],
  ['MS', 'Mississippi'],
  ['MO', 'Missouri'],
  ['MT', 'Montana'],
  ['NE', 'Nebraska'],
  ['NV', 'Nevada'],
  ['NH', 'New Hampshire'],
  ['NJ', 'New Jersey'],
  ['NM', 'New Mexico'],
  ['NY', 'New York'],
  ['NC', 'North Carolina'],
  ['ND', 'North Dakota'],
  ['OH', 'Ohio'],
  ['OK', 'Oklahoma'],
  ['OR', 'Oregon'],
  ['PA', 'Pennsylvania'],
  ['RI', 'Rhode Island'],
  ['SC', 'South Carolina'],
  ['SD', 'South Dakota'],
  ['TN', 'Tennessee'],
  ['TX', 'Texas'],
  ['UT', 'Utah'],
  ['VT', 'Vermont'],
  ['VA', 'Virginia'],
  ['WA', 'Washington'],
  ['WV', 'West Virginia'],
  ['WI', 'Wisconsin'],
  ['WY', 'Wyoming'],
]

const REGIONS_BY_COUNTRY = {
  CA: CA_REGIONS,
  US: US_REGIONS,
}

const COUNTRY_LABELS = {
  CA: 'Canada',
  US: 'US',
}

function AddressForm({ title, data, setData }) {
  const update = (field) => (e) =>
    setData({ ...data, [field]: e.target.value })

  const trimField = (field) => () => {
    const trimmed = (data[field] || '').trim()
    if (trimmed !== data[field]) {
      setData({ ...data, [field]: trimmed })
    }
  }

  const handleCountryChange = (e) => {
    setData({
      ...data,
      country: e.target.value,
      province: '',
    })
  }

  const regions = REGIONS_BY_COUNTRY[data.country] || CA_REGIONS
  const regionLabel =
    data.country === 'US' ? 'State' : 'Province'
  const postalLabel =
    data.country === 'US' ? 'ZIP Code' : 'Postal Code'

  return (
    <div className="card">
      <h2>{title}</h2>

      <input
        placeholder="Name"
        value={data.name}
        onChange={update('name')}
        onBlur={trimField('name')}
      />

      <input
        placeholder="Address"
        value={data.address}
        onChange={update('address')}
        onBlur={trimField('address')}
        style={{ marginBottom: '12px' }}
      />

      <div className="row-three">
        <input
          placeholder="City"
          value={data.city}
          onChange={update('city')}
          onBlur={trimField('city')}
        />

        <select
          value={data.province}
          onChange={update('province')}
          className="province-select"
        >
          <option value="">{regionLabel}</option>
          {regions.map(([code]) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>

        <select
          value={data.country}
          onChange={handleCountryChange}
        >
          <option value="CA">Canada</option>
          <option value="US">US</option>
        </select>
      </div>

      <input
        placeholder={postalLabel}
        value={data.postal}
        onChange={update('postal')}
        onBlur={trimField('postal')}
      />
    </div>
  )
}

function App() {
  const [sender, setSender] = useState({
    name: '',
    address: '',
    city: '',
    province: '',
    postal: '',
    country: 'CA',
  })

  const [receiver, setReceiver] = useState({
    name: '',
    address: '',
    city: '',
    province: '',
    postal: '',
    country: 'CA',
  })

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="container">
      <div className="controls no-print">
        <div className="controls-header">
          <h1>Shipping Label Generator</h1>

          <button onClick={handlePrint}>
            Print Label
          </button>
        </div>

        <div className="form-grid">
          <AddressForm
            title="Sender"
            data={sender}
            setData={setSender}
          />

          <AddressForm
            title="Receiver"
            data={receiver}
            setData={setReceiver}
          />
        </div>
      </div>

      <div className="label">
        <div className="from-section">
          <div className="section-title">FROM</div>

          <div className="from-body">
            <div>{sender.name}</div>
            <div>{sender.address}</div>
            <div>
              {[
                sender.city,
                sender.province,
                sender.city && sender.province
                  ? COUNTRY_LABELS[sender.country] ||
                    sender.country
                  : '',
              ]
                .filter(Boolean)
                .join(', ')}
            </div>
            <div>{sender.postal}</div>
          </div>
        </div>

        <div className="to-section">
          <div className="section-title">TO</div>

          <div className="receiver-name">
            {receiver.name}
          </div>

          <div className="receiver-body">
            <div>{receiver.address}</div>
            <div>
              {[
                receiver.city,
                receiver.province,
                receiver.city && receiver.province
                  ? COUNTRY_LABELS[receiver.country] ||
                    receiver.country
                  : '',
              ]
                .filter(Boolean)
                .join(', ')}
            </div>
            <div className="receiver-postal">
              {receiver.postal}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
