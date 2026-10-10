"use client";

import { useState } from "react";
import { COURSES, MENTORS } from "../data";
import { useClab } from "../store";
import { Avatar, Btn, Empty, Header, Icon, card } from "../ui";

const pct = (done: number, total: number) => Math.round((done / total) * 100);

export function CoursesSection() {
  const { d, a } = useClab();
  const current = COURSES.filter((c) => d.progress[c.id] !== undefined && d.progress[c.id] < c.lessons);
  const featured = current[0];
  return (
    <div className="space-y-6 p-4">
      {featured && (
        <button
          type="button"
          onClick={() => a.go({ name: "course", id: featured.id })}
          className="flex w-full items-center gap-3 rounded-2xl bg-[#D9C4F5] p-3 text-left transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={featured.image} alt="" className="h-16 w-24 rounded-lg object-cover" />
          <span className="min-w-0 flex-1">
            <span className="block text-[14px] font-semibold text-white drop-shadow-sm">{featured.title}</span>
            <span className="block text-[11px] text-white/90">
              {featured.length} · {featured.lessons} lessons
            </span>
            <span className="mt-2 block h-3 overflow-hidden rounded-full bg-white">
              <span className="block h-full rounded-full bg-[#5A2DA0]" style={{ width: `${pct(d.progress[featured.id], featured.lessons)}%` }} />
            </span>
          </span>
          <span className="text-[12px] font-bold text-white">{pct(d.progress[featured.id], featured.lessons)}%</span>
        </button>
      )}

      <section>
        <h3 className="text-[15px] font-semibold text-[#3D1A6E]">Suggested courses</h3>
        <div className="no-scrollbar -mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-1">
          {COURSES.filter((c) => c.id !== featured?.id).map((c) => {
            const started = d.progress[c.id] !== undefined;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => a.go({ name: "course", id: c.id })}
                className={`${card} w-36 shrink-0 overflow-hidden text-left transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-md`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt="" className="h-24 w-full object-cover" />
                <span className="block p-2.5">
                  <span className="block text-[12.5px] font-semibold text-[#24212B]">{c.title}</span>
                  <span className="block text-[10.5px] text-[#6F6A78]">
                    {c.length} · {c.lessons} lessons
                  </span>
                  <span className="mt-2 block rounded-full bg-[#5A2DA0] py-1 text-center text-[10.5px] font-semibold text-white">{started ? "Keep learning" : "Get started"}</span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="text-[15px] font-semibold text-[#3D1A6E]">Top mentors</h3>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {MENTORS.map((m) => (
            <button key={m.id} type="button" onClick={() => a.go({ name: "mentor", id: m.id })} className="group flex flex-col items-center rounded-2xl p-2 text-center hover:bg-[#F7F3FC]">
              <Avatar src={m.photo} name={m.name} size={64} />
              <span className="mt-2 text-[12.5px] font-semibold text-[#3D1A6E]">{m.name}</span>
              <span className="text-[10.5px] text-[#6F6A78]">{m.role}</span>
              <span className="mt-1 text-[10.5px] text-[#55505E]">{m.courses} courses</span>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}

export function CourseDetail({ id }: { id?: string }) {
  const { d, a } = useClab();
  const c = COURSES.find((x) => x.id === id);
  const [busy, setBusy] = useState(false);
  if (!c) return <Empty icon="course" title="Course not found" body="" action={<Btn variant="soft" onClick={a.back}>Go back</Btn>} />;
  const done = d.progress[c.id];
  const started = done !== undefined;
  const finished = started && done >= c.lessons;
  const mentor = MENTORS.find((m) => m.id === c.mentor);
  const enrol = () => {
    setBusy(true);
    setTimeout(() => {
      setBusy(false);
      a.enrol(c.id);
      a.toast(`Enrolled in ${c.title}`);
    }, 600);
  };
  return (
    <div>
      <Header title="Course" onBack={a.back} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={c.image} alt="" className="h-44 w-full object-cover" />
      <div className="p-4">
        <h3 className="text-[19px] font-semibold text-[#3D1A6E]">{c.title}</h3>
        <p className="mt-1 text-[12.5px] text-[#6F6A78]">
          {c.length} · {c.lessons} lessons
        </p>
        {mentor && (
          <button type="button" onClick={() => a.go({ name: "mentor", id: mentor.id })} className="mt-3 flex items-center gap-2 rounded-full bg-[#F7F3FC] py-1 pl-1 pr-3 text-[12px] text-[#3D1A6E] hover:bg-[#F0E5FA]">
            <Avatar src={mentor.photo} name={mentor.name} size={26} />
            {mentor.name} · {mentor.role}
          </button>
        )}
        {started && (
          <div className="mt-4">
            <div className="flex justify-between text-[11.5px] font-medium text-[#3D1A6E]">
              <span>{finished ? "Completed" : "Your progress"}</span>
              <span>
                {done}/{c.lessons} · {pct(done, c.lessons)}%
              </span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-[#F0E5FA]">
              <div className="h-full rounded-full bg-[#8F49CD] transition-[width] duration-500" style={{ width: `${pct(done, c.lessons)}%` }} />
            </div>
          </div>
        )}
        <ol className="mt-5 divide-y divide-[#EFEAF5]">
          {Array.from({ length: c.lessons }, (_, i) => {
            const state = !started ? "locked" : i < done ? "done" : i === done ? "next" : "locked";
            return (
              <li key={i} className="flex items-center gap-3 py-2.5 text-[13px]">
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-[11px] font-bold ${state === "done" ? "bg-[#8F49CD] text-white" : state === "next" ? "bg-[#F0E5FA] text-[#8F49CD] ring-2 ring-[#8F49CD]" : "bg-[#F1EFF4] text-[#A39DAE]"}`}
                >
                  {state === "done" ? <Icon name="check" className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span className={state === "locked" ? "text-[#A39DAE]" : "text-[#24212B]"}>Lesson {i + 1}</span>
                {state === "next" && <span className="ml-auto text-[11px] font-semibold text-[#8F49CD]">Up next</span>}
              </li>
            );
          })}
        </ol>
        <div className="sticky bottom-0 -mx-4 mt-4 border-t border-[#EFEAF5] bg-white/95 px-4 py-3 backdrop-blur">
          {!started ? (
            <Btn className="w-full" loading={busy} onClick={enrol}>
              Get started
            </Btn>
          ) : finished ? (
            <div className="flex items-center justify-center gap-2 rounded-xl bg-[#E9FBEA] py-2.5 text-[13px] font-semibold text-[#1F6B33]">
              <Icon name="check" className="h-4 w-4" /> Course completed
            </div>
          ) : (
            <Btn
              className="w-full"
              onClick={() => {
                a.lesson(c.id, c.lessons);
                if (done + 1 >= c.lessons) a.toast(`You finished ${c.title}`);
              }}
            >
              <Icon name="play" className="h-4 w-4" fill /> Complete lesson {done + 1}
            </Btn>
          )}
        </div>
      </div>
    </div>
  );
}

export function MentorDetail({ id }: { id?: string }) {
  const { d, a } = useClab();
  const m = MENTORS.find((x) => x.id === id);
  if (!m) return <Empty icon="users" title="Mentor not found" body="" action={<Btn variant="soft" onClick={a.back}>Go back</Btn>} />;
  const asked = d.mentorRequests.includes(m.id);
  const courses = COURSES.filter((c) => c.mentor === m.id);
  return (
    <div>
      <Header title="Mentor" onBack={a.back} />
      <div className="flex flex-col items-center p-5 text-center">
        <Avatar src={m.photo} name={m.name} size={96} />
        <p className="mt-3 text-[18px] font-semibold text-[#3D1A6E]">{m.name}</p>
        <p className="text-[12.5px] text-[#6F6A78]">{m.role}</p>
        <p className="mt-1 text-[12px] text-[#55505E]">{m.courses} courses on CLAB</p>
        <Btn
          className="mt-4"
          variant={asked ? "soft" : "primary"}
          onClick={() => {
            a.mentor(m.id);
            a.toast(asked ? "Mentorship request withdrawn" : `Mentorship request sent to ${m.name}`);
          }}
        >
          <Icon name={asked ? "check" : "users"} className="h-4 w-4" />
          {asked ? "Request sent" : "Request mentorship"}
        </Btn>
      </div>
      <div className="px-4 pb-6">
        <h3 className="text-[14px] font-semibold text-[#3D1A6E]">Classes</h3>
        {courses.length === 0 ? (
          <p className="mt-1 text-[12.5px] text-[#6F6A78]">No classes listed in this prototype yet.</p>
        ) : (
          <div className="mt-2 space-y-2">
            {courses.map((c) => (
              <button key={c.id} type="button" onClick={() => a.go({ name: "course", id: c.id })} className={`${card} flex w-full items-center gap-3 p-2.5 text-left hover:shadow-md`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt="" className="h-12 w-16 rounded-lg object-cover" />
                <span className="flex-1">
                  <span className="block text-[13px] font-semibold text-[#3D1A6E]">{c.title}</span>
                  <span className="block text-[11px] text-[#6F6A78]">
                    {c.length} · {c.lessons} lessons
                  </span>
                </span>
                <Icon name="arrow" className="h-4 w-4 text-[#8F49CD]" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
