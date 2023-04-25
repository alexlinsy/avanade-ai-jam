import React from "react";
import { useGlobalContext } from "../../context";
import Resume from "../ResumeList/ResumeList";
import Loader from "../Loader/Loader";

import "./ResumeList.css";


const ResumeList = () => {
  const { resumes, loading, resultTitle } = useGlobalContext();
  const resumeBriefInfo = resumes.map((resume: any) => {
    return {
      ...resume,
      id: resume.id,
      avatar: resume.avatar,
      fullName: resume.fullName,
      title: resume.title,
      level:resume.level,
      contact:resume.contact,
      work_email:resume.work_email,
      region:resume.region,
      country:resume.country,
      city:resume.city,
      embedding:resume.embedding,
      experiences:resume.experience,
      certificates:resume.experiences,
    };
  });

  if (loading) return <Loader />;

  return (
    <section className="resumelist">
      <div className="container">
        <div className="section-title">
          <h2>{resultTitle}</h2>
        </div>
        <div className="resumelist-content grid">
          {resumeBriefInfo.map((item: any, index: any) => {
            return <Resume key={index} {...item} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default ResumeList;
