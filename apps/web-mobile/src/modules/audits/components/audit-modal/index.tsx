import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

import { RecyclingReport } from '@/entities/report';
import { Skeleton } from '@/components/ui/skeleton';

interface AuditModalProps {
  report: RecyclingReport;
  onClose: () => void;
  onApprove: (comments: string) => void;
  onReject: (comments: string) => void;
  isLoading: boolean;
  isOpen: boolean;
}

export function AuditModal({ report, onClose, onApprove, onReject, isLoading, isOpen }: AuditModalProps) {
  const [comments, setComments] = useState('');

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="flex h-[80vh] flex-col">
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-2 px-12 py-4">
              <Skeleton className="h-[400px] w-[100%] rounded-sm" />
              <Skeleton className="h-[200px] w-[100%] rounded-sm" />
            </div>
          )}

          {!isLoading && (
            <>
              <DialogHeader className="px-6 py-4 border-b">
                <DialogTitle>Recycling Report Audit</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="general" className="flex flex-col flex-1 overflow-hidden">
                <TabsList className="px-6 border-b">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="evidence">Evidence</TabsTrigger>
                  <TabsTrigger value="auditHistory">Audit History</TabsTrigger>
                </TabsList>
                <div className="flex-1 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="p-6">
                      <TabsContent value="general" className="mt-0">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold">Report Information</h3>
                            <p>
                              <strong>ID:</strong> {report?.id}
                            </p>
                            <p>
                              <strong>Date:</strong> {new Date(report?.reportDate).toLocaleString()}
                            </p>
                            <p>
                              <strong>Status:</strong>{' '}
                              <Badge variant={report.audited ? 'default' : 'destructive'}>
                                {report.audited ? 'Approved' : 'Pending'}
                              </Badge>
                            </p>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">User Information</h3>
                            <p>
                              <strong>Submitted By:</strong> {report?.user?.name || 'N/A'}
                            </p>
                            <p>
                              <strong>Email:</strong> {report?.user?.email || 'N/A'}
                            </p>
                            <p>
                              <strong>Phone:</strong> {report?.phone || 'N/A'}
                            </p>
                            <p>
                              <strong>Wallet Address:</strong> {report?.walletAddress || 'N/A'}
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="materials" className="mt-0">
                        <h3 className="mb-4 text-lg font-semibold">Recycled Materials</h3>
                        <ul className="space-y-2">
                          {Object.entries(report?.materials).map(([material, amount]) => (
                            <li key={material} className="flex items-center justify-between p-2 bg-gray-100 rounded">
                              <span className="font-medium">{material}</span>
                              <span>{amount} kg</span>
                            </li>
                          ))}
                        </ul>
                      </TabsContent>
                      <TabsContent value="evidence" className="mt-0">
                        <h3 className="mb-4 text-lg font-semibold">Residue Evidence</h3>
                        <img
                          src={report?.residueEvidence}
                          alt="Residue Evidence"
                          className="max-h-[400px] w-full rounded-lg object-contain shadow-md"
                        />
                      </TabsContent>
                      <TabsContent value="auditHistory" className="mt-0">
                        <h3 className="mb-4 text-lg font-semibold">Audit History</h3>
                        {report.audits && report.audits.length > 0 ? (
                          <ul className="space-y-4">
                            {report?.audits?.map((audit, index) => (
                              <li key={audit.id} className="p-4 bg-gray-100 rounded">
                                <p>
                                  <strong>Audit {index + 1}</strong>
                                </p>
                                <p>
                                  <strong>Date:</strong> {new Date(audit?.createdAt).toLocaleString()}
                                </p>
                                <p>
                                  <strong>Status:</strong> {audit?.audited ? 'Approved' : 'Rejected'}
                                </p>
                                <p>
                                  <strong>Comments:</strong> {audit?.comments || 'No comments'}
                                </p>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p>No previous audits</p>
                        )}
                      </TabsContent>
                    </div>
                  </ScrollArea>
                </div>
              </Tabs>
              <DialogFooter className="px-6 py-4 border-t">
                <div className="flex items-center justify-between w-full">
                  <div className="flex-grow mr-4">
                    <Textarea
                      placeholder="Comments"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="w-full"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={onClose}>
                      Close
                    </Button>
                    <Button onClick={() => onApprove(comments)} variant="default">
                      Approve
                    </Button>
                    <Button onClick={() => onReject(comments)} variant="destructive">
                      Reject
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
