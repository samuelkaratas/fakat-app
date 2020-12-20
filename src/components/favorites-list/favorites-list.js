import React, { useEffect, useState } from "react";

import "./favorites-list.css";

import { useSelector } from "react-redux";

import {
  selectCurrentUser,
  selectCurrentUserId,
} from "../../redux/user/user.selectors";

import { getFav } from "../../firebase/firebase";
import Favourite from "components/favourite/favourite";

const FavoritesList = () => {
  const [favData, setFavData] = useState([]);
  const currentUser = useSelector(selectCurrentUser);
  const currentUserId = useSelector(selectCurrentUserId);

  const favorites = currentUserId ? currentUser.favorites : [];

  useEffect(() => {
    let isSub = true;

    if (currentUserId) {
      getFav(favorites).then((data) => {
        if (isSub) {
          setFavData(data);
        }
      });
    }

    return () => (isSub = false);
  }, [setFavData, currentUserId, favorites]);

  return (
    <div>
      {currentUserId ? (
        favData.length ? (
          <div className="favorites-container">
            {favData.map((data, ind) => (
              <Favourite key={ind} data={data} />
            ))}
          </div>
        ) : (
          <p>Favorileriniz boş</p>
        )
      ) : (
        <div>
          <p>Favorilerini görebilmek için giriş yap.</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesList;
