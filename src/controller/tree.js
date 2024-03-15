import * as FileSystem from "expo-file-system";
const { StorageAccessFramework } = FileSystem;
import AsyncStorage from "@react-native-async-storage/async-storage";

import tree from "../data/tree.json";

import BinarySearchTree from "../class/Node";

const createUri = async () => {
  const permissions =
    await StorageAccessFramework.requestDirectoryPermissionsAsync();
  if (permissions.granted) {
    // Get the directory uri that was approved
    let directoryUri = permissions.directoryUri;
    try {
      await AsyncStorage.setItem("dataUri", directoryUri);
    } catch (error) {
      console.log(error);
    }
  } else {
    alert("Bạn phải cấp quyền");
  }
};

const getUri = async () => {
  let dataUri = "";

  dataUri = await AsyncStorage.getItem("dataUri");
  return dataUri;
};

const openFile = async (dataUri) => {
  const uriFolder = await StorageAccessFramework.readDirectoryAsync(dataUri);

  const uriFile = uriFolder[0];

  if (uriFile) {
    const file = await StorageAccessFramework.readAsStringAsync(uriFile);

    try {
      // const jsonData = JSON.parse(file);
      // return jsonData;
      return file;
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return null;
    }
  } else {
    return null;
  }
};

const createFile = async (data, uri) => {
  if (data) {
    await StorageAccessFramework.createFileAsync(
      uri,
      "tree.txt",
      "application/text"
    )
      .then(async (fileUri) => {
        // Save data to newly created file

        const jsonString = JSON.stringify(data);
        await FileSystem.writeAsStringAsync(fileUri, jsonString, {
          encoding: FileSystem.EncodingType.UTF8,
        });

        alert("Đã lưu từ");
      })

      .catch((e) => {
        console.log(e);
      });
  } else {
    alert("Lưu thất bại");
  }
};

const saveFile = async (data, dataUri) => {
  const uriFolder = await StorageAccessFramework.readDirectoryAsync(dataUri);

  const uriFile = uriFolder[0];

  if (uriFile) {
    await FileSystem.deleteAsync(uriFile);

    // await FileSystem.writeAsStringAsync(uriFile, jsonString, {
    //   encoding: FileSystem.EncodingType.UTF8,
    //   append: false,
    // });

    await StorageAccessFramework.createFileAsync(
      dataUri,
      "tree.txt",
      "application/text"
    )
      .then(async (fileUri) => {
        // Save data to newly created file

        const jsonString = JSON.stringify(data);
        await FileSystem.writeAsStringAsync(fileUri, jsonString, {
          encoding: FileSystem.EncodingType.UTF8,
        });
      })

      .catch((e) => {
        console.log(e);
      });
  }
};

const checkTree = (data, index, word) => {
  let checked = false;

  data.forEach((d) => {
    if (d.index === index && d.data.word === word.word) {
      checked = true;
    }
  });
  return checked;
};

export const addWord = async (word, index) => {
  let dataUri = await getUri();

  while (dataUri === "") {
    await createUri();
    dataUri = await getUri();
  }

  const treeFile = JSON.parse(await openFile(dataUri));
  if (treeFile === null) {
    const dataArray = [
      {
        data: word,
        index: index,
        read: 0,
      },
    ];

    await createFile(dataArray, dataUri);
    alert("Đã lưu từ");
  } else {
    const dataArray = treeFile;
    const checked = checkTree(dataArray, index, word);

    if (checked) {
      alert("Từ này đã từng được thêm vào sổ tay");
    } else {
      const data = {
        data: word,
        index: index,
        read: 0,
      };

      dataArray.push(data);
      await saveFile(dataArray, dataUri);
      alert("Đã lưu từ");
    }
  }
};

export const readWord = async () => {
  let dataUri = await getUri();

  while (dataUri === "") {
    await createUri();
    dataUri = await getUri();
  }
  const dataArray = JSON.parse(await openFile(dataUri));

  if (dataArray) {
    const bts = new BinarySearchTree();

    dataArray.forEach((d) => {
      bts.insert(d.data, d.read, d.index);
    });

    const dataArrayLNF = [];
    duyet_LNF(bts.root, dataArrayLNF);
    return dataArrayLNF;
  } else {
    return [];
  }
};

const duyet_LNF = (root, dataArrayLNF) => {
  if (root !== null) {
    duyet_LNF(root.left, dataArrayLNF);

    dataArrayLNF.push({
      data: root.word.wordItem,
      read: root.word.read,
      index: root.word.index,
    });
    duyet_LNF(root.right, dataArrayLNF);
  }
};

export const checkWord = async (value) => {
  let dataUri = await getUri();

  while (dataUri === "") {
    await createUri();
    dataUri = await getUri();
  }
  const dataArray = JSON.parse(await openFile(dataUri));
  if (dataArray === null) {
    return false;
  } else {
    const bts = new BinarySearchTree();
    dataArray.map((d) => {
      bts.insert(d.data, d.read, d.index);
    });

    return bts.search(bts.root, value);
  }
};

export const searchWord = async (searchQuery) => {
  let dataUri = await getUri();

  while (dataUri === "") {
    await createUri();
    dataUri = await getUri();
  }
  const dataArray = JSON.parse(await openFile(dataUri));
  if (dataArray === null) {
    alert("Chưa có từ vựng");
  } else {
    const bts = new BinarySearchTree();
    dataArray.forEach((d) => {
      bts.insert(d.data, d.read, d.index);
    });
    const dataSearch = [];

    bts.searchNode(bts.root, searchQuery, dataSearch);

    return dataSearch;
  }
};

export const deleteWord = async (value) => {
  let dataUri = await getUri();

  while (dataUri === "") {
    await createUri();
    dataUri = await getUri();
  }
  const dataArray = JSON.parse(await openFile(dataUri));

  if (dataArray === null) {
    alert("file rong");
  } else {
    const bts = new BinarySearchTree();
    dataArray.forEach((d) => {
      bts.insert(d.data, d.read, d.index);
    });

    bts.delete(value);

    const dataArrayLNF = [];
    duyet_LNF(bts.root, dataArrayLNF);

    await saveFile(dataArrayLNF, dataUri);

    alert("Đã xoá từ");
  }
};

export const updateRead = async (value) => {
  let dataUri = await getUri();

  while (dataUri === "") {
    await createUri();
    dataUri = await getUri();
  }
  const dataArray = JSON.parse(await openFile(dataUri));

  if (dataArray === null) {
    alert("Chưa có từ vựng");
  } else {
    const bts = new BinarySearchTree();
    dataArray.forEach((d) => {
      bts.insert(d.data, d.read, d.index);
    });

    bts.updateReadTree(bts.root, value);

    const dataArrayRead = [];

    duyet_LNF(bts.root, dataArrayRead);
    await saveFile(dataArrayRead, dataUri);
  }
};

const duyet_LNF_Frequent = (root, dataArrayLNF) => {
  if (root !== null) {
    duyet_LNF_Frequent(root.left, dataArrayLNF);

    if (root.word.read >= 5) {
      dataArrayLNF.push({
        data: root.word.wordItem,
        read: root.word.read,
        index: root.word.index,
      });
    }

    duyet_LNF_Frequent(root.right, dataArrayLNF);
  }
};

export const readFrequentWord = async () => {
  let dataUri = await getUri();

  while (dataUri === "") {
    await createUri();
    dataUri = await getUri();
  }
  const dataArray = JSON.parse(await openFile(dataUri));

  if (dataArray) {
    const bts = new BinarySearchTree();

    dataArray.forEach((d) => {
      bts.insert(d.data, d.read, d.index);
    });

    const dataArrayLNF = [];
    duyet_LNF_Frequent(bts.root, dataArrayLNF);
    return dataArrayLNF;
  } else {
    return [];
  }
};
