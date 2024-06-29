import { useEffect, useState } from "react";

import "./App.css";

const AUTH_TOKEN = `eyJ0eXAiOiJKV1QiLCJub25jZSI6IlpJVVU4NkI3YUZfdDJOQWNGSl8xajNHcUtia01COXdZTDVrVmxhbWtDWmsiLCJhbGciOiJSUzI1NiIsIng1dCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyIsImtpZCI6Ik1HTHFqOThWTkxvWGFGZnBKQ0JwZ0I0SmFLcyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC9mMDQ0ZmY0ZS1hMTQ1LTRiZmEtYTg5Yy0wMDBmNTY1ZmViNmQvIiwiaWF0IjoxNzE5NjYxNTc0LCJuYmYiOjE3MTk2NjE1NzQsImV4cCI6MTcxOTc0ODI3NCwiYWNjdCI6MCwiYWNyIjoiMSIsImFpbyI6IkFUUUF5LzhYQUFBQUFyd3FhVVRjK2o5bVM5MXhBcGZSdHp0UXZWWk5DSm9PNk1EQ0hjN2o5b3FuVGtLRXNCUFpTbE1jcnQ2V1hJZHgiLCJhbXIiOlsicHdkIl0sImFwcF9kaXNwbGF5bmFtZSI6IkdyYXBoIEV4cGxvcmVyIiwiYXBwaWQiOiJkZThiYzhiNS1kOWY5LTQ4YjEtYThhZC1iNzQ4ZGE3MjUwNjQiLCJhcHBpZGFjciI6IjAiLCJmYW1pbHlfbmFtZSI6Ik1hbmlhbiIsImdpdmVuX25hbWUiOiJBc2hvayIsImlkdHlwIjoidXNlciIsImlwYWRkciI6IjI0MDE6NDkwMDoxYzIwOjQzOTM6NjA5MTo3MjBkOjZlNjE6ODc4NiIsIm5hbWUiOiJBc2hvayBNYW5pYW4iLCJvaWQiOiIwZmIwYTQ0Zi05Mzg0LTRkNTAtYjY1YS1kMWVlZTQyYjc2ZDQiLCJwbGF0ZiI6IjgiLCJwdWlkIjoiMTAwMzIwMDJEMUE5MzgyNCIsInB3ZF9leHAiOiIzMTUzMzQ3MjYiLCJwd2RfdXJsIjoiaHR0cHM6Ly9wcm9kdWN0aXZpdHkuc2VjdXJlc2VydmVyLm5ldC9taWNyb3NvZnQ_bWFya2V0aWQ9ZW4tVVNcdTAwMjZlbWFpbD1zdXBwb3J0JTQwcHJvcGVydHlnYXRld2F5LmF1XHUwMDI2c291cmNlPVZpZXdVc2Vyc1x1MDAyNmFjdGlvbj1SZXNldFBhc3N3b3JkIiwicmgiOiIwLkFXWUFUdjlFOEVXaC1rdW9uQUFQVmxfcmJRTUFBQUFBQUFBQXdBQUFBQUFBQUFCbUFKdy4iLCJzY3AiOiJNYWlsLlJlYWRXcml0ZSBvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJNbkw4RF9QMjNiNkhtZ2VfWkQ0Y1NKaWhCeFpsWEhPUjVtTFFBU0xFbEdrIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6Ik9DIiwidGlkIjoiZjA0NGZmNGUtYTE0NS00YmZhLWE4OWMtMDAwZjU2NWZlYjZkIiwidW5pcXVlX25hbWUiOiJzdXBwb3J0QHByb3BlcnR5Z2F0ZXdheS5hdSIsInVwbiI6InN1cHBvcnRAcHJvcGVydHlnYXRld2F5LmF1IiwidXRpIjoiWGN3OF82RGZlVXVqd0tkWWlQWk1BQSIsInZlciI6IjEuMCIsIndpZHMiOlsiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il0sInhtc19jYyI6WyJDUDEiXSwieG1zX2lkcmVsIjoiMTAgMSIsInhtc19zc20iOiIxIiwieG1zX3N0Ijp7InN1YiI6ImRUVm9MRVhaMk83SDNoazVSQl9sbExxUGhMckRIMkRZX2ppMk1vSGNnZFUifSwieG1zX3RjZHQiOjE2OTAyNDAzNDh9.fIlCzqd7Z7uTY4xxdSmiMbgcMO0Zpp2D9VwkWDJqHelscU-eVSzkZ0QiZ4ZTEIfv5nkZCsTPR5JARGuXCWSl1OOlK8M3E4U3f53OEsxzQ5pbmZQhFhF5TK8ZMS1ThDdR4oEnxJqggb2jUA89tdq4dqelwzi6aqHD3JbmoBZqdSowOBTh28qIF5N2ZgN20zxyvwV9vkBKBaO0t-YWrM__1ltqbeMPnxMVKaau3gr1Jkj4viQEf0OZL3W_FFSC_CtrJhGLO24g8LnAE4r9k77gl9RDw6zajyRdybucfsDu6I12Ba5hK9bbe16DiwoRQuiHNlJOLxxiPZP3X5nb3T-f9Q`;

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", AUTH_TOKEN);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://graph.microsoft.com/v1.0/me/messages", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result.value);
        setData(result.value);
      })
      .catch((error) => console.error(error));
  }, []);

  // Function to add a property to an item by id
  function addPropertyToItem(itemId, property) {
    // Find the item by id in the current state
    const updatedItems = data.map((item) => {
      if (item.id === itemId) {
        // Add the new property to this item using spread operator
        return { ...item, ...property };
      }
      return item; // Return unchanged item if it's not the one we're looking for
    });

    // Update the state with the updatedItems array
    setData(updatedItems);
  }

  function handleGetAttachments(messageID) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", AUTH_TOKEN);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://graph.microsoft.com/v1.0/me/messages/${messageID}/attachments/`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        addPropertyToItem(messageID, { attachments: result.value });
      })
      .catch((error) => console.error(error));
  }

  function handleDownloadAttachment(messageID, attachmentID, filename) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", AUTH_TOKEN);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://graph.microsoft.com/v1.0/me/messages/${messageID}/attachments/${attachmentID}/$value`,
      requestOptions
    )
      .then((response) => response.arrayBuffer())
      .then((result) => {
        console.log(result);

        let uint8Array = new Uint8Array(result);

        // Create a Blob from the Uint8Array
        let blob = new Blob([uint8Array], { type: "application/octet-stream" });

        // Create a temporary URL for the Blob
        let url = URL.createObjectURL(blob);

        // Example: Downloading the file
        let a = document.createElement("a");
        a.href = url;
        a.download = filename; // Specify file name
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Clean up by revoking the Object URL
        URL.revokeObjectURL(url);
      })
      .catch((error) => console.error(error));
  }

  return (
    <>
      {data?.map((d) => (
        <article
          key={d.id}
          className="rounded-lg border border-gray-100 bg-white p-4 shadow-sm transition hover:shadow-lg sm:p-6 m-4"
        >
          {/* <span className="inline-block rounded bg-blue-600 p-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M12 14l9-5-9-5-9 5 9 5z" />
              <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
              />
            </svg>
          </span> */}

          <h3 className="mt-0.5 text-lg font-medium text-gray-900 text-left">
            from: {d.sender.emailAddress.name}
          </h3>

          <h3 className="mt-0.5 text-lg font-medium text-gray-900 text-left">
            Subject: {d.subject}
          </h3>

          <p
            className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500"
            dangerouslySetInnerHTML={{ __html: d.body.content }}
          ></p>

          {d.hasAttachments && (
            <button
              onClick={() => {
                handleGetAttachments(d.id);
              }}
            >
              Get Attachments
            </button>
          )}

          {d?.attachments &&
            Array.isArray(d?.attachments) &&
            d?.attachments?.map((attachment) => (
              <button
                key={attachment.id}
                onClick={() => {
                  handleDownloadAttachment(
                    d.id,
                    attachment.id,
                    attachment.name
                  );
                }}
              >
                Download Attachments
              </button>
            ))}
        </article>
      ))}
    </>
  );
}

export default App;
