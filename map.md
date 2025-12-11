`.has()` **aur** `.delete()` Map ke internal **hash table / hash map** algorithm par work karte hain.
Simple language me samjho 👇

---

# 🔥 Map internally kaise kaam karta hai?

JavaScript **Map internally ek Hash Table jaisa structure** use karta hai.

### 👉 Hash Table kya karta hai?

* Key ko ek **hash function** se number me convert karta hai
* Us number ko use karke value ko **fast access** karta hai
* `O(1)` (constant time) operations deta hai (mostly)

---

# ✅ `.has()` kaise work karta hai?

### Step-by-step:

1. Tum `.has(key)` call karte ho
2. Map internally **key ka hash generate** karta hai
3. Hash ke basis par **correct bucket** find karta hai
4. Check karta hai ki key exist karti hai ya nahi
5. Agar key mil gayi → return `true`, nahi mili → return `false`

### Time Complexity:

```
Average: O(1)
Worst: O(n) — (agar collision bahut ho jaaye)
```

---

# ✅ `.delete()` kaise work karta hai?

### Step-by-step:

1. `.delete(key)` call hota hai
2. Map same hashing algorithm use karke correct bucket find karta hai
3. Agar key exist kare → element remove karta hai
4. Memory free karta hai
5. Return karta hai:

   * `true` → delete success
   * `false` → key mili hi nahi

### Time Complexity:

```
Average: O(1)
Worst: O(n)
```

---

# ⭐ Important Points

* Map JS engine me **highly optimized hash tables** use karta hai
* Hashing ke wajah se lookup, delete, insert **super fast** hota hai
* Order maintain hota hai (insertion order)

---

# ☑ Example (Working Visual)

### Suppose Map ye hai:

```
{
  "name" → "Cyber",
  "age" → 21
}
```

### Tum `.has("age")` karo:

* "age" ka hash banta hai → bucket #45 me store tha → return true

### Tum `.delete("name")` karo:

* "name" ka hash banta hai → bucket #12 milta hai → us entry ko delete kar deta hai

---

Agar chaho to me tumhe **diagram ke saath hash map ka visualization** bhi bana ke de sakta hoon.
