import Header from "@/components/layout/Header";
import BookmarkList from "@/components/bookmarks/BookmarkList";

export const metadata = {
  title: "Simpanan - Quranku",
};

export default function BookmarksPage() {
  return (
    <>
      <Header isFixed={true} isBack={true} title="Simpanan" />
      <BookmarkList />
    </>
  );
}
