import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as apis from "../../apis";
import moment from "moment";
import { Lists, AudioLoading } from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useDispatch } from "react-redux";
import * as actions from "../../store/actions";
import { useSelector } from "react-redux";
import icons from "../../ultis/icons";
const Album = () => {
  const {
    AiOutlineHeart,
    AiFillHeart,
    BsThreeDots,
    MdSkipNext,
    MdSkipPrevious,
    CiRepeat,
    BsPauseFill,
    BsFillPlayFill,
    CiShuffle,
    TbRepeatOnce,
  } = icons;
  const { pid } = useParams();
  const [playlistData, setPlaylistData] = useState({});
  const dispatch = useDispatch();
  const { curSongId, isPlaying, songs } = useSelector((state) => state.music);
  useEffect(() => {
    const fetchDetailPlaylist = async () => {
      const response = await apis.apiGetDetaiPlaylist(pid);
      if (response?.data.err === 0) {
        setPlaylistData(response.data?.data);
        dispatch(actions.setPlaylist(response?.data?.data?.song.items));
      }
    };

    fetchDetailPlaylist();
  }, [pid]);

  return (
    <div className="flex gap-8 w-full h-full px-[59px]">
      <div className="flex-none w-1/4 border border-red-500 flex flex-col items-center gap-2">
        <div className="relative w-full overflow-hidden">
          <img
            src={playlistData?.thumbnailM}
            alt="thumbnail"
            className={`w-full object-contain ${
              isPlaying
                ? "rounded-full animate-rotate-center"
                : "rounded-md animate-rotate-center-pause"
            } shadow-md`}
          />
          <div
            className={`absolute top-0 left-0 bottom-0 right-0 hover:bg-overlay-30 text-white flex items-center justify-center ${
              isPlaying && "rounded-full"
            }`}>
            <span className="p-3 border border-white rounded-full">
              {isPlaying ? <AudioLoading /> : <BsFillPlayFill size={30} />}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-1">
          <h3 className="text-[20px] font-bold text-gray-800">
            {playlistData?.title}
          </h3>
          <span className="flex gap-2 items-center text-gray-500 text-xs">
            <span>Cập nhật:</span>
            <span>
              {moment
                .unix(playlistData?.contentLastUpdate)
                .format("DD/MM/YYYY")}
            </span>
          </span>
          <span className="flex gap-2 items-center text-gray-500 text-xs">
            {playlistData?.artistsNames}
          </span>
          <span className="flex gap-2 items-center text-gray-500 text-xs">{`${Math.round(
            playlistData?.like / 1000
          )}K người yêu thích`}</span>
        </div>
      </div>
      <Scrollbars style={{ width: "100%", height: "80%" }}>
        <div className="flex-auto mb-40">
          <span className="text-sm">
            <span className="text-gray-600">Lời tựa </span>
            <span>{playlistData?.sortDescription}</span>
          </span>
          <Lists totalDuration={playlistData?.song?.totalDuration} />
        </div>
      </Scrollbars>
    </div>
  );
};

export default Album;
