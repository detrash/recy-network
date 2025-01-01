import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { RecyclingReport } from '@/entities/report';
import { Skeleton } from '@/components/ui/skeleton';
import { materialColors, chartConfig } from '@/modules/dashboard/componentes/chart/constants';
import { Evidence } from './evidence';
import { ChartConfigType } from '@/modules/dashboard/componentes/chart/types';
import { StatusBadge } from '@/components/status-badge';
import { AuditStatusConstants } from '@/constants/index';

interface AuditModalProps {
  report: RecyclingReport;
  onClose: () => void;
  onApprove: (comments: string) => void;
  onReject: (comments: string) => void;
  isLoading: boolean;
  isOpen: boolean;
}

export function AuditModal({ report, onClose, onApprove, onReject, isLoading, isOpen }: AuditModalProps) {
  const defaultComments = report?.audits[0]?.comments;
  const status = report?.audits[0]?.status;
  const [comments, setComments] = useState(defaultComments);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <div className="flex h-[80vh] flex-col">
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-2 px-6 py-4">
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
                              <strong>Status:</strong> <StatusBadge status={report.audits[0].status} />
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
                            <p>
                              <strong>Created At: </strong>
                              {new Date(report?.createdAt).toLocaleString()}
                            </p>
                          </div>
                        </div>
                      </TabsContent>
                      <TabsContent value="materials" className="mt-0">
                        <h3 className="mb-4 text-lg font-semibold">Recycled Materials</h3>
                        <ul className="space-y-2">
                          {Object.entries(report?.materials).map(([material, amount]) => {
                            const materialColor =
                              materialColors[material as keyof typeof materialColors] || 'bg-gray-100';
                            return (
                              <li
                                key={material}
                                className="flex items-center justify-between p-2 text-white rounded"
                                style={{ backgroundColor: materialColor }}
                              >
                                <span className="font-medium">
                                  {chartConfig[material as keyof ChartConfigType]?.label || material}
                                </span>
                                <span>{amount} kg</span>
                              </li>
                            );
                          })}
                        </ul>
                      </TabsContent>
                      <TabsContent value="evidence" className="mt-0">
                        <h3 className="mb-4 text-lg font-semibold">Residue Evidence</h3>
                        <Evidence url={report?.residueEvidence} />
                      </TabsContent>
                    </div>
                  </ScrollArea>
                </div>
              </Tabs>
              <DialogFooter className="px-6 py-4 border-t">
                <div className="flex items-center justify-between w-full">
                  <div className="flex-grow mr-4">
                    <Textarea
                      defaultValue={defaultComments}
                      placeholder="Comments"
                      value={comments}
                      onChange={(e) => setComments(e.target.value)}
                      className="w-full"
                      disabled={status === AuditStatusConstants.APPROVED || status === AuditStatusConstants.REJECTED}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={onClose}>
                      Close
                    </Button>
                    <Button
                      disabled={status === AuditStatusConstants.APPROVED || status === AuditStatusConstants.REJECTED}
                      onClick={() => onApprove(comments)}
                      variant="default"
                      className="bg-green-500 hover:bg-green-600"
                    >
                      Approve
                    </Button>
                    <Button
                      onClick={() => onReject(comments)}
                      variant="destructive"
                      disabled={status === AuditStatusConstants.REJECTED || status === AuditStatusConstants.APPROVED}
                    >
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
