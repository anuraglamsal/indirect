import { useState, useLayoutEffect } from "react";
import { WithContext as ReactTags } from "react-tag-input";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  getFirestore,
  addDoc,
  collection,
  where,
  onSnapshot,
  query,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { v4 as uuidv4 } from "uuid";
import "./Upload.css";
import { FaPlus } from "react-icons/fa";
import { IconContext } from "react-icons";
import SideBar from "./SideBar";
const KeyCodes = {
  comma: 188,
  enter: [10, 13],
};

const delimiters = [...KeyCodes.enter, KeyCodes.comma];

function Upload() {
  const [files, setFiles] = useState([]);
  const [latest_index, setIndex] = useState(0);
  const [tags, setTags] = useState([]);
  const [_tags, setTags2] = useState([]);
  const [urls, setURLs] = useState([]);
  const auth = getAuth();
  const db = getFirestore();
  var realtimepics;

  useLayoutEffect(() => {
    fetchPics();
  }, []);

  async function fetchPics() {
    const q = query(collection(db, "photos"), where("uid", "==", auth.currentUser.uid));
    realtimepics = onSnapshot(q, querySnapshot => {
      var arr = [];
      querySnapshot.forEach(doc => {
        arr.push(doc);
      });
      arr.sort();
      setURLs(arr);
    });
  }

  function Upload(event) {
    event.preventDefault();
    if (files.length == 0) {
      alert("No files selected");
    } else {
      var count = 0;
      for (var i = 0; i < files.length; ++i) {
        if (files[i][1] == null) {
          count++;
        } else {
          const storage = getStorage();
          let __ref = uuidv4().toString();
          const _ref = ref(storage, __ref);
          var result = uploadBytes(_ref, files[i][0]).then(snapshot => {
            getDownloadURL(ref(storage, __ref)).then(url => {
              try {
                addDoc(collection(db, "photos"), {
                  url: url,
                  tags: _tags,
                  uid: auth.currentUser.uid,
                });
              } catch (e) {
                console.error(e);
              }
            });
          });
        }
      }
      if (count == files.length) {
        alert("No files selected");
      }
    }
  }

  function handleChange(event) {
    var arr_1 = [...files];
    var _index = latest_index;
    for (var i = 0; i < event.target.files.length; ++i) {
      arr_1.push([event.target.files[i], _index]);
      _index++;
    }
    setFiles(arr_1);
    setIndex(_index);
  }

  function deleteImage(i) {
    var arr = [...files];
    for (var j = 0; j < arr.length; ++j) {
      if (arr[j][1] == i) {
        arr[j][1] = null;
        break;
      }
    }
    setFiles(arr);
  }

  function tags_delete(i) {
    var arr = [...tags];
    var arr_2 = [..._tags];
    arr.splice(i, 1);
    arr_2.splice(i, 1);
    setTags(arr);
    setTags2(arr_2);
  }

  function tags_addition(tag) {
    setTags([...tags, tag]);
    setTags2([..._tags, tag.text]);
  }

  function deletePic(id) {
    deleteDoc(doc(db, "photos", id));
  }

  return (
    <div>
      <div class="grid-container">
        <div class="grid-child purple">
          <div className="upload__container">
            <div className="upload__text__header">Upload Product Images Below </div>
            <form onSubmit={Upload}>
              <input
                className="choose__files"
                id="file-upload"
                type="file"
                accept=".jpg, .jpeg, .png"
                onChange={handleChange}
                multiple
              />

              <label for="file-upload" class="custom-file-upload">
                <IconContext.Provider
                  value={{ style: { color: "black", fontSize: "60px", opacity: "0.8" } }}
                >
                  <div>
                    <FaPlus />
                  </div>
                </IconContext.Provider>
              </label>

              <input className="upload__submit" type="Submit" value="Submit" />
            </form>
            <div className="upload__text__header">Upload Product Tags Below </div>
            {files.map(img => (
              <div>
                {img[1] != null && (
                  <div>
                    <div className="upload__container__image__dad">
                      <img className="upload__container__image" src={URL.createObjectURL(img[0])} />

                      <button className="upload__delete" onClick={() => deleteImage(img[1])}>
                        {" "}
                        Delete{" "}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
            <ReactTags
              placeholder="  Press Enter To Add"
              inputFieldPosition="top"
              tags={tags}
              handleDelete={tags_delete}
              handleAddition={tags_addition}
              delimiters={delimiters}
            />
          </div>
        </div>

        <div class="grid-child green">
          <div className="upload__container__right">
            <div className="upload__text__header">Manage Uploaded Photos Here</div>
            {urls.map(url => (
              <div>
                <div className="upload__container__image__dad">
                  <img className="upload__container__image" src={url.data().url} />
                  <button onClick={() => deletePic(url.id)}> Delete </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SideBar />
    </div>
  );
}

export default Upload;
