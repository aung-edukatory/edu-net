export const metadata = {
  title: "About Us | Edukatory",
  description: "Learn more about Edukatory and our mission.",
};

export default function AboutUsPage() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-primary-blue text-white py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl text-[#0b2349]  md:text-5xl font-bold mb-4">
            Lorem Ipsum
          </h1>
          <p className="text-lg text-[#5f6f86] md:text-xl max-w-3xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lorem Ipsum
            </h2>
            <p className="text-gray-600 leading-7">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div className="bg-gray-100 rounded-2xl p-8">
            <h3 className="text-xl font-semibold mb-3">Lorem Ipsum</h3>
            <ul className="space-y-3 text-gray-600">
              <li>Lorem ipsum dolor sit amet</li>
              <li>Consectetur adipiscing elit</li>
              <li>Sed do eiusmod tempor</li>
              <li>Incididunt ut labore et dolore</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-gray-50 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Lorem Ipsum
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Lorem Ipsum",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
              {
                title: "Lorem Ipsum",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
              {
                title: "Lorem Ipsum",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              },
            ].map((item) => (
              <div key={item.title + item.text} className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}