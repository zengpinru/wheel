
function openStore () {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('localStorage');
    let db = null;

    request.onsuccess = function (e) {
      db = request.result;
      console.log('数据库打开成功');
      resolve(db);
    }

    request.onerror = function (e) {
      console.log('数据库打开报错');
      reject(e);
    }

    request.onupgradeneeded = function (e) {
      let objectStore;
      db = event.target.result;
      console.log('数据库升级');
      if (!db.objectStoreNames.contains('item')) { // 创建表
        objectStore = db.createObjectStore('item', { keyPath: 'name' });
      }
    }
  });
}

function add (db, data) {
  return new Promise((resolve, reject) => {
    const req = db.transaction(['item'], 'readwrite').objectStore('item').add(data);
    req.onsuccess = function (e) {
      resolve('success');
    }
    req.onerror = function (e) {
      reject(e);
    }
  });
}

function remove (db, name) {
  return new Promise((resolve, reject) => {
    const req = db.transaction('item', 'readwrite').objectStore('item').delete(name);
    req.onsuccess = function () {
      resolve('success');
    }
    req.onerror = function (e) {
      reject(e);
    }
  });
}

function update (db, data) {
  return new Promise((resolve, reject) => {
    const req = db.transaction('item', 'readwrite').objectStore('item').put(data);
    req.onsuccess = function () {
      resolve('success');
    }
    req.onerror = function (e) {
      reject(e);
    }
  });
}

function get (db, name) {
  return new Promise((resolve, reject) => {
    const req = db.transaction('item', 'readonly').objectStore('item').get(name);
    req.onsuccess = function (e) {
      resolve(e.target.result);
    }
    req.onerror = function (e) {
      reject(e);
    }
  });
}

function getAll (db) {
  return new Promise((resolve, reject) => {
    const req = db.transaction('item').objectStore('item').openCursor();
    const res = [];
    req.onsuccess = function (e) {
      const cursor = e.target.result;
      if (cursor) {
        res.push(cursor.value);
        cursor.continue();
      } else {
        resolve(res);
      }
    }
    req.onerror = function (e) {
      console.log('查询数据失败');
      console.log(e);
      reject(e);
    }
  });
}

// openStore().then(db => {
//   // add(db, { name: 'age', value: 12, time: 0 }).then(res => {
//   //   console.log(res);
//   // });
//   // get(db, 'name').then(res => {
//   //   console.log(res);
//   // });
//   // update(db, { name: 'name', value: 'haha', time: 0, key: 2 }).then(res => {
//   //   console.log(res);
//   // });
//   // getAll();
//   remove(db, 'age').then(res => {
//     console.log(res);
//   });
// }).catch(e => {
//   console.log(e);
// });

class MyLocalStore {
  constructor () {
    this.db = null;
    this.initData();
  }
  async initData () {
    this.db = await openStore();
  }
  async getItem (key) {
    if (!this.db) {
      await this.initData();
    }
    const res = await get(this.db, key);
    return res;
  }
  async setItem (key, value) {
    if (!this.db) {
      await this.initData();
    }
    await update(this.db, { name: key, value: value, time: 0 });
  }
  removeItem () {

  }
}

let test = new MyLocalStore();
test.setItem('username', 'zengpinru');
test.setItem('age', 12);
console.log(test.getItem('age'));