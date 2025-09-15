import { useState } from 'react';
import { useGenerateCutSceneImageUrl } from "~/hooks/mutations";

export const useImageUpload = (
  episodeId: string,
  counselorId: string,
  onSuccess?: (imageUrl: string) => void
) => {
  const [isUploading, setIsUploading] = useState(false);

  const { mutate: generateImageUrl } = useGenerateCutSceneImageUrl({
    onSuccess: async (response) => {
      const presignedUrl = response.data?.data?.presignedUrl?.uploadUrl;
      const publicUrl = response.data?.data?.presignedUrl?.publicUrl;
      
      if (presignedUrl && publicUrl && currentFile) {
        try {
          // 2. Presigned URL로 실제 파일 업로드
          const uploadResponse = await fetch(presignedUrl, {
            method: 'PUT',
            body: currentFile,
            headers: {
              'Content-Type': currentFile.type,
            },
          });

          if (uploadResponse.ok) {
            // 3. 성공 시 public URL 반환
            onSuccess?.(publicUrl);
          } else {
            throw new Error('File upload failed');
          }
        } catch (error) {
          console.error('Failed to upload file:', error);
          alert('이미지 업로드에 실패했습니다.');
        } finally {
          setIsUploading(false);
          setCurrentFile(null);
        }
      }
    },
    onError: (error) => {
      console.error('Failed to generate presigned URL:', error);
      alert('이미지 업로드 URL 생성에 실패했습니다.');
      setIsUploading(false);
      setCurrentFile(null);
    },
  });

  const [currentFile, setCurrentFile] = useState<File | null>(null);

  const uploadImage = (file: File) => {
    if (!file) return;

    // 파일 타입 검증
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      alert('지원하지 않는 파일 형식입니다. (JPG, PNG, GIF, WEBP만 허용)');
      return;
    }

    // 파일 크기 검증 (5MB 제한)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('파일 크기가 너무 큽니다. (최대 5MB)');
      return;
    }

    setIsUploading(true);
    setCurrentFile(file);

    // 파일 확장자 확인
    const extension = file.type.split('/')[1].toUpperCase();
    const extensionMap: Record<string, string> = {
      'JPEG': 'EXTENSION_JPG',
      'JPG': 'EXTENSION_JPG', 
      'PNG': 'EXTENSION_PNG',
      'GIF': 'EXTENSION_GIF',
      'WEBP': 'EXTENSION_WEBP',
    };

    const apiExtension = extensionMap[extension] || 'EXTENSION_JPG';

    // 1. Presigned URL 생성 요청
    generateImageUrl({
      episodeId,
      counselorId,
      data: {
        extension: apiExtension as any,
      },
    });
  };

  return {
    uploadImage,
    isUploading,
  };
}; 