import { Terminal } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

function NotFound() {
  return (
    <Alert>
      <Terminal className="h-4 w-4" />
      <AlertTitle>出错了😅</AlertTitle>
      <AlertDescription>未找到页面。</AlertDescription>
    </Alert>
  );
}

export { NotFound };
