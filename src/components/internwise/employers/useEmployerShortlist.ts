import { useEffect, useMemo, useState } from "react";

export type ShortlistStatus = "new" | "contacted";

export type ShortlistEntry = {
  candidateId: string;
  status: ShortlistStatus;
  shortlistedAt: string;
  notes: string;
};

const shortlistStorageKey = "internwise-employer-shortlist";

const readShortlist = (): ShortlistEntry[] => {
  if (typeof window === "undefined") {
    return [];
  }

  const raw = window.localStorage.getItem(shortlistStorageKey);
  if (!raw) {
    return [];
  }

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const formatShortlistedTime = (isoDate: string) => {
  try {
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(isoDate));
  } catch {
    return isoDate;
  }
};

const useEmployerShortlist = () => {
  const [entries, setEntries] = useState<ShortlistEntry[]>([]);

  useEffect(() => {
    setEntries(readShortlist());
  }, []);

  useEffect(() => {
    window.localStorage.setItem(shortlistStorageKey, JSON.stringify(entries));
  }, [entries]);

  const shortlistedIds = useMemo(() => entries.map((entry) => entry.candidateId), [entries]);

  const shortlistCandidate = (candidateId: string) => {
    setEntries((current) => {
      if (current.some((entry) => entry.candidateId === candidateId)) {
        return current;
      }

      return [
        {
          candidateId,
          status: "new",
          shortlistedAt: new Date().toISOString(),
          notes: "",
        },
        ...current,
      ];
    });
  };

  const removeCandidate = (candidateId: string) => {
    setEntries((current) => current.filter((entry) => entry.candidateId !== candidateId));
  };

  const updateStatus = (candidateId: string, status: ShortlistStatus) => {
    setEntries((current) =>
      current.map((entry) => (entry.candidateId === candidateId ? { ...entry, status } : entry)),
    );
  };

  const updateNotes = (candidateId: string, notes: string) => {
    setEntries((current) =>
      current.map((entry) => (entry.candidateId === candidateId ? { ...entry, notes } : entry)),
    );
  };

  const getEntry = (candidateId: string) => entries.find((entry) => entry.candidateId === candidateId);

  return {
    entries,
    shortlistedIds,
    shortlistCandidate,
    removeCandidate,
    updateStatus,
    updateNotes,
    getEntry,
  };
};

export default useEmployerShortlist;
