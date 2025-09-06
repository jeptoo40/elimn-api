

export async function retryOperation(operation, retries = 3, delay = 1000) {
    let lastError;
  
    for (let attempt = 0; attempt < retries; attempt++) {
      try {
        return await operation(); // Try the operation
      } catch (err) {
        lastError = err;
        if (attempt < retries - 1) {
          
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
  
   
    throw lastError;
  }
  