import { useState, useEffect } from "react";
import Highlighter from 'react-highlight-words';

export const useTableSearch = ({ searchVal, data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [origData, setOrigData] = useState([]);
  const [searchIndex, setSearchIndex] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const crawl = (user, allValues) => {
      if (!allValues) allValues = [];
      for (var key in user) {
        if (typeof user[key] === "object") crawl(user[key], allValues);
        else allValues.push(user[key] + " ");
      }
      return allValues;
    };
    const fetchData = () => {
      const users = data;
      setOrigData(users);
      setFilteredData(users);
      const searchInd = users.map(user => {
        const allValues = crawl(user);
        return { allValues: allValues.toString() };
      });
      setSearchIndex(searchInd);
      if (users) setLoading(false);
    };
    fetchData();
  }, [data]);

  useEffect(() => {
    if (searchVal) {
      const tempSearch = searchVal.trim(' ').toLowerCase().split(' ').filter(i => i)
      const reqData = searchIndex.map((user, index) => {
        for(const term of tempSearch){
            if (user.allValues.toLowerCase().includes(term)){
              return origData[index];
            }
        }
        return null;
      });
      setFilteredData(
        reqData.filter(user => {
          if (user) return true;
          return false;
        })
      );
    } else setFilteredData(origData);
  }, [searchVal, origData, searchIndex]);

  return { filteredData, loading };
};
