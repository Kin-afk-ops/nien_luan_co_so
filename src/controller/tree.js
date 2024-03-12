import * as FileSystem from "expo-file-system";
const { StorageAccessFramework } = FileSystem;
import AsyncStorage from "@react-native-async-storage/async-storage";

import tree from "../data/tree.json";
import { Alert } from "react-native";

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
    Alert("Bạn phải cấp quyền");
  }
};

const getUri = async () => {
  let dataUri = "";

  dataUri = await AsyncStorage.getItem("dataUri");
  return dataUri;
};

const openFile = async () => {
  const dataUri = await getUri();

  const uriFolder = await StorageAccessFramework.readDirectoryAsync(dataUri);

  const uriFile = uriFolder[0];

  const file = await StorageAccessFramework.readAsStringAsync(uriFile);

  const tree = JSON.parse(file);
  return tree;
};

const addNodeToTree = async (node, tree) => {
  if (tree === null) {
  }
  // Check if permission granted

  await createUri();
  const dataUri = await getUri();

  let data = node;

  // Create file and pass it's SAF URI

  await StorageAccessFramework.createFileAsync(
    dataUri,
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
};

export const readTree = () => {};
export const checkNode = () => {};

const addNodeItem = (word, tree) => {
  if (tree === null) {
    const newWord = {
      word: {
        wordItem: word,
        like: false,
        done: false,
      },
      left: null,
      right: null,
    };
  } else {
    if (tree.word.wordItem.word === word) {
      Alert("Từ đã tồn tại trong sổ tay");
    } else if (tree.word.wordItem.word > word) {
      addNodeItem(word, tree.left);
    } else {
      addNodeItem(word, tree.right);
    }
  }
};

export const addNode = async (word) => {
  const tree = openFile();

  addNodeItem(word, tree);
  addNodeToTree(tree);
};
export const deleteNode = () => {};

export const updateNode = () => {};
