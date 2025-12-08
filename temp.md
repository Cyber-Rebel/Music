ERRor main.jsx:11 useEffect must not return anything besides a function, which is used for clean-up.

It looks like you wrote useEffect(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

useEffect(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://react.dev/link/hooks-data-fetching
<App>		
(anonymous)	@	main.jsx:11




















You’re getting this warning because **useEffect callback cannot be `async`** and **cannot return a Promise**.
React expects the function returned by useEffect (if any) to be a **cleanup function only** — not a Promise.

---

### ❌ Wrong Code (what causes the error)

```js
useEffect(async () => {
  const res = await fetchData();
  setData(res);
}, []);
```

---

### ✔ Correct Code (wrap async inside)

```js
useEffect(() => {
  const getData = async () => {
    const res = await fetchData();
    setData(res);
  };

  getData();
}, []); 
```

---

### If you also need cleanup

```js
useEffect(() => {
  let isMounted = true;

  const getData = async () => {
    const res = await fetchData();
    if (isMounted) {
      setData(res);
    }
  };

  getData();

  return () => {
    isMounted = false; // cleanup
  };
}, []);
```

---

### Why React complains?

* When you make `useEffect(async () => ...)`, React interprets your async function as returning a **Promise**.
* Cleanup must only return a **function**, not a Promise.

---

If you want, send me your exact code and I will fix it properly for you.
