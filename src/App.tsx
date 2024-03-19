import { useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    const main = async () => {
      const response = await (
        await fetch(
          `http://ltin1158041:8081/_api/web/lists/GetByTitle('Password')/items`,
          {
            headers: {
              accept: "application/json; odata=verbose",
            },
          }
        )
      ).json();
      console.log(response.d.results);
    };
    main();
  }, []);

  const addData = () => {
    fetch(
      `http://ltin1158041:8081/_api/web/lists/getbytitle('Password')/items`,
      {
        method: "POST",
        body: JSON.stringify({
          __metadata: { type: "SP.Data.PasswordListItem" },
          username: "X262534",
          url:"https://abc.com",
          name:"instagram"
        }),
        headers: {
          "content-type": "application/json;odata=verbose",
          Accept: "application/json;odata=verbose",
        },
      }
    );
  };
  const getdata = () => {
    fetch(
      `http://ltin1158041:8081/_api/web/lists/getbytitle('Password')/items`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json;odata=verbose",
          Accept: "application/json;odata=verbose",
        },
      }
    )

      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data:", data);
        // Process fetched data here, if needed
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

// const itemid=20
  const deleteItem = async (val:any) => {
    try {

      const response = await fetch(
        `http://ltin1158041:8081/_api/web/lists/getbytitle('Password')/items(${val.ID})`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json;odata=verbose",
            "IF-MATCH": "*",
            "X-HTTP-Method": "DELETE",
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
  
      console.log("Item deleted successfully");
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const itemId = 25; 
  const updatedData = { 
    username: "NewUsername",
    url: "NewUrl",
    ID: itemId,
   __metadata:{'type':'SP.Data.PasswordListItem'},
  };
  
  
  const updateItem = async () => {
    try {
      // Fetch the item metadata to obtain the ETag
      const metadataResponse = await fetch(
        `http://ltin1158041:8081/_api/web/lists/getbytitle('Password')/items(${itemId})`,
        {
          method: "GET",
          headers: {
            Accept: "application/json;odata=verbose",
          },
        }
      );
  
      if (!metadataResponse.ok) {
        throw new Error("Failed to fetch item metadata");
      }
  
      const metadata = await metadataResponse.json();
      console.log(metadata);
      // const etag = metadata?.__metadata?.etag;
  
      // Use PATCH with MERGE to update specific fields
      const response = await fetch(
        `http://ltin1158041:8081/_api/web/lists/getbytitle('Password')/items(${itemId})`,
        {
          method: "POST", 
          headers: {
            "accept": "application/json;odata=verbose",
            "Content-Type": "application/json;odata=verbose",
            "IF-MATCH": '*',
            "X-HTTP-Method": "MERGE",
          },
          body: JSON.stringify(updatedData), 
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update item");
      }
  
      console.log("Item updated successfully");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  
  updateItem();
  
  
  
   
  
  
  

  

  return (
    <>
      <button type="button" onClick={addData}>
        click me
      </button>
      <button type="button" onClick={getdata}>
        Hello
      </button>
      <button type="button" onClick={()=>deleteItem({})}>
        delete
      </button>
      <button type="button" onClick={updateItem}>
        update
      </button>
    </>
  );
}

export default App;
