"use client";

import { useMemo, useState } from "react";
import { SplitPerson, SplitGroup, SplitTransaction } from "@/types";
import Link from "next/link";

export default function SplitPage() {
  const [activeSection, setActiveSection] = useState<"groups" | "people">("groups");

  // Sample data
  const groups: SplitGroup[] = useMemo(() => [
    {
      id: "1",
      name: "Weekend Trip",
      members: [
        { id: "1", name: "You", netAmount: -150 },
        { id: "2", name: "Alice", netAmount: 75 },
        { id: "3", name: "Bob", netAmount: 75 },
      ],
      netAmount: 0,
    },
    {
      id: "2",
      name: "Dinner Group",
      members: [
        { id: "1", name: "You", netAmount: 50 },
        { id: "4", name: "Charlie", netAmount: -50 },
      ],
      netAmount: 0,
    },
  ], []);

  const people: SplitPerson[] = useMemo(() => [
    { id: "2", name: "Alice", email: "alice@example.com", netAmount: -125 },
    { id: "3", name: "Bob", email: "bob@example.com", netAmount: -75 },
    { id: "4", name: "Charlie", email: "charlie@example.com", netAmount: 50 },
  ], []);

  const youOwe = useMemo(
    () => people.filter((p) => p.netAmount < 0).reduce((sum, p) => sum + Math.abs(p.netAmount), 0),
    [people]
  );

  const youReceive = useMemo(
    () => people.filter((p) => p.netAmount > 0).reduce((sum, p) => sum + p.netAmount, 0),
    [people]
  );

  const net = youReceive - youOwe;

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [selectedPerson, setSelectedPerson] = useState<string | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold text-gray-900">Split</h1>
          <button className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium">
            + New Split
          </button>
        </div>
      </header>

      {/* Main Numbers */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">Net</p>
          <p className={`text-2xl font-semibold ${net >= 0 ? "text-green-600" : "text-red-600"}`}>
            ${Math.abs(net).toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            {net >= 0 ? "You'll receive" : "You owe"}
          </p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">You Owe</p>
          <p className="text-2xl font-semibold text-red-600">
            ${youOwe.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Total amount owed</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <p className="text-sm text-gray-600 mb-2">You Receive</p>
          <p className="text-2xl font-semibold text-green-600">
            ${youReceive.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 mt-1">Total amount to receive</p>
        </div>
      </div>

      {/* Pinned Sections */}
      <div className="mb-6">
        <div className="flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveSection("groups")}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeSection === "groups"
                ? "text-black border-b-2 border-black"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Groups
          </button>
          <button
            onClick={() => setActiveSection("people")}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeSection === "people"
                ? "text-black border-b-2 border-black"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            People
          </button>
        </div>
      </div>

      {/* Groups Section */}
      {activeSection === "groups" && (
        <div className="space-y-4">
          {groups.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-500 mb-4">No groups yet</p>
              <button className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium">
                Create Group
              </button>
            </div>
          ) : (
            groups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedGroup(group.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
                  <span className="text-sm text-gray-600">
                    {group.members.length} members
                  </span>
                </div>
                <div className="space-y-2">
                  {group.members.map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700">{member.name}</span>
                      <span
                        className={`text-sm font-semibold ${
                          member.netAmount >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {member.netAmount >= 0 ? "+" : ""}${Math.abs(member.netAmount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    href={`/split/groups/${group.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* People Section */}
      {activeSection === "people" && (
        <div className="space-y-4">
          {people.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
              <p className="text-gray-500 mb-4">No people to split with yet</p>
              <button className="px-4 py-2 rounded-xl bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium">
                Add Person
              </button>
            </div>
          ) : (
            people.map((person) => (
              <div
                key={person.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedPerson(person.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-lg">
                        {person.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{person.name}</h3>
                      {person.email && (
                        <p className="text-sm text-gray-600">{person.email}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-xl font-semibold ${
                        person.netAmount >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {person.netAmount >= 0 ? "+" : ""}${Math.abs(person.netAmount).toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {person.netAmount >= 0 ? "owes you" : "you owe"}
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link
                    href={`/split/people/${person.id}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View history →
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

