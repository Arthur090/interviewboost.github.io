import { db } from '../firebase'
import {
  collection,
  query,
  getDocs,
  where,
  setDoc,
  doc,
  updateDoc
} from "firebase/firestore";
import { IProffesion, IGrade, ICategory, IQuestion, IAnswer } from '../app/components/Types'

const getDbProfessions = async () => { //берем всё
  console.log('getDbProfessions')
  try {
    const querySnapshot = await getDocs(collection(db, "professions"));
    const professions: IProffesion[] = [];
    querySnapshot.forEach((item) => {
      professions.push({
        title: item.data().title,
        id: item.data().id,
        desc: item.data().desc,
        grades: item.data().grades,
      });
    });

    return professions;
  } catch (error) {
    console.error('Error getting documents:', error);
    return [];
  }
};

// const getDbGrades = async (selectedIds: string[]) => {//берем только что есть в selectedIds
//   try {
//     const q = query(collection(db, 'grades'), where('id', 'in', selectedIds));
//     const querySnapshot = await getDocs(q);
//     const grades: IGrade[] = [];

//     querySnapshot.forEach((item) => {
//       grades.push({
//         title: item.data().title,
//         id: item.data().id,
//         categories: item.data().categories,
//       });
//     });

//     return grades;
//   } catch (error) {
//     console.error('Error getting selected documents:', error);
//     return [];
//   }
// };

const getDbAllGrades = async () => { //берем всё
  try {
    const querySnapshot = await getDocs(collection(db, "grades"));
    const grades: IGrade[] = [];
    querySnapshot.forEach((item) => {
      grades.push({
        title: item.data().title,
        id: item.data().id,
        categories: item.data().categories,
      });
    });

    return grades;
  } catch (error) {
    console.error('Error getting selected documents:', error);
    return [];
  }
};

// const getDbCategories = async (selectedIds: string[]) => { //берем только что есть в selectedIds
//   try {
//     const q = query(collection(db, 'categories'), where('id', 'in', selectedIds));
//     const querySnapshot = await getDocs(q);
//     const categories: ICategory[] = [];

//     querySnapshot.forEach((item) => {
//       categories.push({
//         title: item.data().title,
//         id: item.data().id,
//         questions: item.data().questions,
//       });
//     });

//     return categories;
//   } catch (error) {
//     console.error('Error getting selected documents:', error);
//     return [];
//   }
// };

const getDbAllCategories = async () => { //берем всё
  try {
    const querySnapshot = await getDocs(collection(db, 'categories'));
    const categories: ICategory[] = [];
    querySnapshot.forEach((item) => {
      categories.push({
        title: item.data().title,
        id: item.data().id,
        questions: item.data().questions,
      });
    });
    return categories;
  } catch (error) {
    console.error('Error getting selected documents:', error);
    return [];
  }
};

// const getDbQuestions = async (selectedIds: string[]) => { //код получения до 30 штук в selectedIds
//   try {
//     const q = query(collection(db, 'questions'), where('id', 'in', selectedIds));
//     const querySnapshot = await getDocs(q);
//     const questions: IQuestion[] = [];

//     querySnapshot.forEach((item) => {
//       questions.push({
//         text: item.data().text,
//         id: item.data().id,
//         answers: item.data().answers,
//       });
//     });

//     return questions;
//   } catch (error) {
//     console.error('Error getting selected documents:', error);
//     return [];
//   }
// };

// const getDbQuestions = async (selectedIds: string[]) => { //код получения более 30 штук в selectedIds
//   try {
//     const batchSize = 30; // Максимальное количество значений для оператора 'in'
//     const questions: IQuestion[] = [];

//     // Разбиваем выбранные идентификаторы на пакеты по 30 идентификаторов
//     for (let i = 0; i < selectedIds.length; i += batchSize) {
//       const batch = selectedIds.slice(i, i + batchSize);
//       const q = query(collection(db, 'questions'), where('id', 'in', batch));
//       const querySnapshot = await getDocs(q);

//       querySnapshot.forEach((item) => {
//         questions.push({
//           text: item.data().text,
//           id: item.data().id,
//           answers: item.data().answers,
//         });
//       });
//     }

//     return questions;
//   } catch (error) {
//     console.error('Error getting selected documents:', error);
//     return [];
//   }
// };

const getDbAllQuestions = async () => { //берем всё
  try {
    const querySnapshot = await getDocs(collection(db, 'questions'));
    const questions: IQuestion[] = [];
      querySnapshot.forEach((item) => {
        questions.push({
          text: item.data().text,
          id: item.data().id,
          answers: item.data().answers,
        });
      });

    return questions;
  } catch (error) {
    console.error('Error getting selected documents:', error);
    return [];
  }
};

// const getDbAnswers = async (selectedIds: string[]) => { //код получения до 30 штук в selectedIds
//   try {
//     const q = query(collection(db, 'answers'), where('id', 'in', selectedIds));
//     const querySnapshot = await getDocs(q);
//     const answers: IAnswer[] = [];

//     querySnapshot.forEach((item) => {
//       answers.push({
//         text: item.data().text,
//         id: item.data().id,
//       });
//     });

//     return answers;
//   } catch (error) {
//     console.error('Error getting selected documents:', error);
//     return [];
//   }
// };

const getDbAnswers = async (selectedIds: string[]) => { //код получения более 30 штук в selectedIds, если в сторе нет ответов
  try {
    const batchSize = 30; // Максимальное количество значений для оператора 'in'
    const answers: IAnswer[] = [];

    // Разбиваем выбранные идентификаторы на пакеты по 30 идентификаторов
    for (let i = 0; i < selectedIds.length; i += batchSize) {
      const batch = selectedIds.slice(i, i + batchSize);
      const q = query(collection(db, 'answers'), where('id', 'in', batch));
      const querySnapshot = await getDocs(q);

    querySnapshot.forEach((item) => {
      answers.push({
        text: item.data().text,
        id: item.data().id,
      });
    });
    }

    return answers;
  } catch (error) {
    console.error('Error getting selected documents:', error);
    return [];
  }
};

const getDbAllAnswers = async () => { //берем всё на странице хоум
  try {
    const querySnapshot = await getDocs(collection(db, 'answers'));
    const answers: IAnswer[] = [];
      querySnapshot.forEach((item) => {
        answers.push({
          text: item.data().text,
          id: item.data().id,
        });
      });

    return answers;
  } catch (error) {
    console.error('Error getting selected documents:', error);
    return [];
  }
};

//------------------------------код для внесения данных в базу данных
// let a: {id: string, text: string}[] = []
// for (let index = 1; index <= 589; index++) {
//   a.push({id: index.toString(), text: `ответ ${index}`})
// }
// console.log(a)
let arr: string[] = []
for (let index = 532; index <= 589; index++) {
  arr.push(index.toString());
}

const setDocs = () => { // добавляем подколлекцию
  // for (const category of a) {
  //   setDoc(doc(db, "answers", category.id), category);
  // }
  setDoc(doc(db, "categories", '14'), {
    id: '14',
    questions: arr,
    title: 'Angular'
  });
};

const updateDocs = () => { // заменем поле документа
  updateDoc(doc(db, "categories", "4"), {
    id: '4',
    questions: arr,
    title: 'JS in Browser'
  });
};

// export { getDbProfessions, getDbGrades, getDbCategories, getDbQuestions, getDbAnswers, setDocs, updateDocs }
export { getDbProfessions, getDbAllGrades, getDbAllCategories, getDbAllQuestions, getDbAnswers, getDbAllAnswers, setDocs, updateDocs }
