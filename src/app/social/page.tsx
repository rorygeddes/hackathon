"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Friend, FriendRequest } from "@/types";

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState<"friends" | "groups" | "requests">("friends");

  // Sample data
  const friends: Friend[] = useMemo(() => [
    { id: "1", name: "Alice", email: "alice@example.com", status: "accepted" },
    { id: "2", name: "Bob", email: "bob@example.com", status: "accepted" },
    { id: "3", name: "Charlie", email: "charlie@example.com", status: "pending" },
  ], []);

  const requests: FriendRequest[] = useMemo(() => [
    {
      id: "1",
      from: { id: "4", name: "David", email: "david@example.com", status: "pending" },
      to: { id: "0", name: "You", email: "you@example.com", status: "accepted" },
      status: "pending",
      timestamp: new Date(Date.now() - 86400000),
    },
  ], []);

  const groups = useMemo(() => [
    { id: "1", name: "Weekend Trip", members: 3 },
    { id: "2", name: "Dinner Group", members: 4 },
  ], []);

  const acceptedFriends = friends.filter((f) => f.status === "accepted");
  const pendingFriends = friends.filter((f) => f.status === "pending");

  const handleAcceptRequest = (requestId: string) => {
    // In real app, this would call API
    alert(`Accepted friend request from ${requests.find((r) => r.id === requestId)?.from.name}`);
  };

  const handleDeclineRequest = (requestId: string) => {
    // In real app, this would call API
    alert(`Declined friend request from ${requests.find((r) => r.id === requestId)?.from.name}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <header className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-semibold text-apple-gray-darker">Social</h1>
          <button className="px-4 py-2 rounded-2xl bg-apple-blue text-white hover:bg-apple-blue-dark transition-all duration-200 text-sm font-medium shadow-apple">
            + Add Friend
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex gap-4 border-b border-apple-gray">
          <button
            onClick={() => setActiveTab("friends")}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === "friends"
                ? "text-apple-blue border-b-2 border-apple-blue"
                : "text-apple-gray-dark hover:text-apple-blue"
            }`}
          >
            Friends ({friends.length})
          </button>
          <button
            onClick={() => setActiveTab("groups")}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === "groups"
                ? "text-apple-blue border-b-2 border-apple-blue"
                : "text-apple-gray-dark hover:text-apple-blue"
            }`}
          >
            Groups ({groups.length})
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`pb-3 px-1 font-medium transition-colors ${
              activeTab === "requests"
                ? "text-apple-blue border-b-2 border-apple-blue"
                : "text-apple-gray-dark hover:text-apple-blue"
            }`}
          >
            Requests ({requests.length})
          </button>
        </div>
      </div>

      {/* Friends Tab */}
      {activeTab === "friends" && (
        <div className="space-y-4">
          {acceptedFriends.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-apple-gray-dark mb-3">Accepted</h3>
              <div className="space-y-3">
                {acceptedFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="bg-white rounded-3xl shadow-apple border border-apple-gray/30 p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-apple-blue-subtle flex items-center justify-center">
                          <span className="text-lg text-apple-blue">
                            {friend.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-apple-gray-darker">{friend.name}</h4>
                          <p className="text-sm text-apple-gray-dark">{friend.email}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-2xl bg-apple-gray-light hover:bg-apple-gray text-sm font-medium text-apple-gray-darker transition-all duration-200 shadow-apple">
                          DM (future)
                        </button>
                        <Link
                          href={`/split/people/${friend.id}`}
                          className="px-4 py-2 rounded-2xl bg-apple-blue-subtle hover:bg-apple-blue-subtle/80 text-sm font-medium text-apple-blue transition-all duration-200 shadow-apple"
                        >
                          View Split
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {pendingFriends.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-apple-gray-dark mb-3">Pending</h3>
              <div className="space-y-3">
                {pendingFriends.map((friend) => (
                  <div
                    key={friend.id}
                    className="bg-white rounded-3xl shadow-apple border border-apple-gray/30 p-6"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-apple-blue-subtle flex items-center justify-center">
                          <span className="text-lg text-apple-blue">
                            {friend.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-lg font-semibold text-apple-gray-darker">{friend.name}</h4>
                          <p className="text-sm text-apple-gray-dark">{friend.email}</p>
                        </div>
                      </div>
                      <span className="text-sm text-apple-gray-dark">Waiting for acceptance</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {friends.length === 0 && (
            <div className="text-center py-12 bg-white rounded-3xl border border-apple-gray/30 shadow-apple">
              <p className="text-apple-gray-dark mb-4">No friends yet</p>
              <button className="px-4 py-2 rounded-2xl bg-apple-blue text-white hover:bg-apple-blue-dark transition-all duration-200 text-sm font-medium shadow-apple">
                Add Friend
              </button>
            </div>
          )}
        </div>
      )}

      {/* Groups Tab */}
      {activeTab === "groups" && (
        <div className="space-y-4">
          {groups.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-apple-gray/30 shadow-apple">
              <p className="text-apple-gray-dark mb-4">No groups yet</p>
              <button className="px-4 py-2 rounded-2xl bg-apple-blue text-white hover:bg-apple-blue-dark transition-all duration-200 text-sm font-medium shadow-apple">
                Create Group
              </button>
            </div>
          ) : (
            groups.map((group) => (
              <div
                key={group.id}
                className="bg-white rounded-3xl shadow-apple border border-apple-gray/30 p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-apple-gray-darker">{group.name}</h4>
                    <p className="text-sm text-apple-gray-dark">{group.members} members</p>
                  </div>
                  <Link
                    href={`/split/groups/${group.id}`}
                    className="px-4 py-2 rounded-2xl bg-apple-blue-subtle hover:bg-apple-blue-subtle/80 text-sm font-medium text-apple-blue transition-all duration-200 shadow-apple"
                  >
                    View Group
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Requests Tab */}
      {activeTab === "requests" && (
        <div className="space-y-4">
          {requests.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-apple-gray/30 shadow-apple">
              <p className="text-apple-gray-dark">No pending requests</p>
            </div>
          ) : (
            requests.map((request) => (
              <div
                key={request.id}
                className="bg-white rounded-3xl shadow-apple border border-apple-gray/30 p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-apple-blue-subtle flex items-center justify-center">
                      <span className="text-lg text-apple-blue">
                        {request.from.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-apple-gray-darker">
                        {request.from.name}
                      </h4>
                      <p className="text-sm text-apple-gray-dark">{request.from.email}</p>
                      <p className="text-xs text-apple-gray-dark mt-1">
                        {request.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAcceptRequest(request.id)}
                      className="px-4 py-2 rounded-2xl bg-apple-blue text-white hover:bg-apple-blue-dark transition-all duration-200 text-sm font-medium shadow-apple"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleDeclineRequest(request.id)}
                      className="px-4 py-2 rounded-2xl bg-apple-gray-light hover:bg-apple-gray transition-all duration-200 text-sm font-medium text-apple-gray-darker shadow-apple"
                    >
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

