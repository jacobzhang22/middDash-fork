export default function AddressInputs({ addressProps, setAddressProp }) {
  const { phone, roomNumber, dorm, venmo } = addressProps;

  return (
    <>
      <label>Phone</label>
      <input
        type="tel"
        placeholder="Phone number"
        value={phone}
        onChange={(ev) => setAddressProp("phone", ev.target.value)}
      />
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label>Room number</label>
          <input
            type="text"
            placeholder="Room number"
            value={roomNumber}
            onChange={(ev) => setAddressProp("roomNumber", ev.target.value)}
          />
        </div>
        <div>
          <label>Dorm</label>
          <input
            type="text"
            placeholder="Dorm"
            value={dorm}
            onChange={(ev) => setAddressProp("dorm", ev.target.value)}
          />
        </div>
      </div>
      <label>Enter Your Venmo Username (or write CASH)</label>
      <input
        type="text"
        placeholder="Venmo"
        value={venmo}
        onChange={(ev) => setAddressProp("venmo", ev.target.value)}
      />
    </>
  );
}
