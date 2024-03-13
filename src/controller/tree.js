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

    return JSON.parse(file);
  } else {
    return null;
  }
};

const createFile = async (data, uri) => {
  if (data) {
    await StorageAccessFramework.createFileAsync(
      uri,
      "tree.json",
      "application/json"
    )
      .then(async (fileUri) => {
        // Save data to newly created file
        await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data), {
          encoding: FileSystem.EncodingType.UTF8,
        });
      })
      .catch((e) => {
        console.log(e);
      });
  } else {
    alert("Lưu thất bại");
  }
};

const savFile = async (data, dataUri) => {
  const uriFolder = await StorageAccessFramework.readDirectoryAsync(dataUri);

  const uriFile = uriFolder[0];

  if (uriFile) {
    await FileSystem.writeAsStringAsync(uriFile, JSON.stringify(data), {
      encoding: FileSystem.EncodingType.UTF8,
    });
  }
};

const addNodeToTree = async (tree) => {
  let dataUri = await getUri();

  while (!dataUri) {
    await createUri();
    dataUri = await getUri();
  }

  // Check if permission granted

  // Create file and pass it's SAF URI
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

export const readTree = () => {};
export const checkNode = () => {};

export const addWord = async (word, index) => {
  let dataUri = await getUri();

  while (dataUri === "") {
    await createUri();
    dataUri = await getUri();
  }
  const treeFile = await openFile(dataUri);
  if (treeFile === null) {
    const dataArray = [
      {
        data: word,
        index: index,
      },
    ];

    await createFile(dataArray, dataUri);
  } else {
    const dataArray = treeFile;
    const checked = checkTree(dataArray, index, word);

    if (checked) {
      alert("Từ này đã từng được thêm vào sổ tay");
    } else {
      const data = {
        data: word,
        index: index,
      };

      dataArray.push(data);
      await savFile(dataArray, dataUri);
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
  const dataArray = await openFile(dataUri);

  if (dataArray) {
    const bts = new BinarySearchTree();

    dataArray.forEach((d) => {
      bts.insert(d.data);
    });

    const dataArrayLNF = [];
    await duyet_LNF(bts.root, dataArrayLNF);
    return dataArrayLNF;
  } else {
    return [];
  }

  // console.log(dataArrayLNF);
};

const duyet_LNF = async (root, dataArrayLNF) => {
  if (root !== null) {
    await duyet_LNF(root.left, dataArrayLNF);

    dataArrayLNF.push(root.word.wordItem);
    await duyet_LNF(root.right, dataArrayLNF);
  }
};

export const deleteNode = () => {};

export const updateNode = () => {};
