import React from "react";

const SongCard = props => {
    const { name } = props;

    return(
        <div>
            <p>{name}</p>
            {/* <p>Hello</p> */}
        </div>
    )
}

export default SongCard;