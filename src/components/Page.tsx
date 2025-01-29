import { Redirect } from "wouter";
import { FC, ReactNode, Suspense } from "react";

interface PageProps {
  permission?: () => boolean;
  redirect?: string;
  layout?: React.ComponentType<{ children: ReactNode }>;
  page: React.LazyExoticComponent<React.ComponentType>;
  fallback?: ReactNode; // Permite pasar un Skeleton personalizado
}

export const Page: FC<PageProps> = ({
  permission,
  redirect = "/",
  layout: LayoutPage,
  page: ContentPage,
  fallback,
}) => {
  const isAllowed = permission ? permission() : true;

  if (!isAllowed) return <Redirect to={redirect} />;

  const content = (
    <Suspense fallback={fallback || <DefaultLoader />}>
      <ContentPage />
    </Suspense>
  );

  return LayoutPage ? <LayoutPage>{content}</LayoutPage> : content;
};

// Loader por defecto si no se proporciona `fallback`
const DefaultLoader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-blue-500"></div>
  </div>
);
