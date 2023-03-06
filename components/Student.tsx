import React from "react";
import Router from "next/router";

export type StudentProps = {
    id: number;
    name: string;
    lastName: string;
    status: boolean;
    parent: {
        name: string;
        lastName: string;
    } | null;
};

const Student: React.FC<{ student: StudentProps }> = ({ student }) => {
    const parentName = student.parent ? student.parent.name : "Unknown parent";
    return (
        // <div onClick={() => Router.push("/p/[id]", `/p/${student.id}`)}></div>
        <div>
            <h2>{student.name}</h2>
            <small>Hijo de {parentName}</small>
            <p>{student.status}</p>
            <style jsx>{`
        div {
          color: inherit;
          padding: 2rem;
        }
      `}</style>
        </div>
    );
};

export default Student;