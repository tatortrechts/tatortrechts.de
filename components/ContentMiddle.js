export default function ContentMiddle({ children }) {
  return (
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-7">{children}</div>
        </div>
      </div>
    </section>
  );
}
