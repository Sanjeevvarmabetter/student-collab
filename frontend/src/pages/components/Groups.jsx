import React from "react";

const GroupCard = ({ group }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{group.name}</div>
          <p className="text-gray-700 text-base">Course: {group.course.name}</p>
          <p className="text-gray-700 text-base">Members: {group.members.length}</p>
          <p className="text-gray-700 text-base">Meetings: {group.meetings.length}</p>
          <p className="text-gray-700 text-base">Study Materials: {group.studyMaterials.length}</p>
        </div>
      </div> 
    );
};

export default GroupCard;