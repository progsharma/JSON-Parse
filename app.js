import("node-fetch")
  .then(async (nodeFetch) => {
    const fetch = nodeFetch.default;

    // Function to fetch JSON data from the API
    async function fetchData() {
      try {
        const response = await fetch(
          "https://s3.amazonaws.com/open-to-cors/assignment.json"
        );
        const data = await response.json();
        return data.products; // Return only the 'products' object
      } catch (error) {
        console.error("Error fetching data:", error);
        return null;
      }
    }

    // Function to convert object of products to array
    function convertProductsToArray(productsObj) {
      return Object.keys(productsObj).map((key) => {
        return { ...productsObj[key], id: key }; // Add 'id' property with the unique identifier
      });
    }

    // Function to display the sorted data
    function displaySortedData(products) {
      if (Array.isArray(products)) {
        // Sort products by popularity in descending order
        products.sort((a, b) => b.popularity - a.popularity);

        // Display sorted products with Title and Price
        products.forEach((product) => {
          console.log(`Title: ${product.title} - Price: ${product.price}`);
        });
      } else {
        console.error("Invalid data format. Expected an array.");
      }
    }

    // Main function to fetch data and display sorted results
    async function main() {
      const productsData = await fetchData();

      if (productsData) {
        // Convert object of products to an array
        const productsArray = convertProductsToArray(productsData);

        // Display sorted data by popularity
        displaySortedData(productsArray);
      } else {
        console.log("Failed to fetch data.");
      }
    }

    // Call the main function
    main();
  })
  .catch((err) => {
    console.error("Error importing node-fetch:", err);
  });
