import { useEffect, useState } from "react";
import API from "../api/api.js";

export default function Advisories() {
  const [advisories, setAdvisories] = useState([]);

  useEffect(() => {
    const fetchAdvisories = async () => {
      try {
        const { data } = await API.get("/advisories");
        setAdvisories(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAdvisories();
  }, []);

  return (
    <div>
      <h2>Health Advisories</h2>
      {advisories.length === 0 ? (
        <p>No advisories yet.</p>
      ) : (
        <ul>
          {advisories.map((adv) => (
            <li key={adv._id}>
              <strong>{adv.title}</strong> - {adv.message}{" "}
              <em>by {adv.author ? adv.author.name : "Unknown"}</em>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
